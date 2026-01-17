<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Holiday;

class FetchPhilippineHolidays extends Command {
    protected $signature = 'holidays:fetch {year?}';
    protected $description = 'Fetch Philippine holidays from Calendarific API and store them in the database';

    public function handle() {
        $year = $this->argument('year') ?? now()->year;
        $apiKey = env('CALENDARIFIC_API_KEY');

        if (!$apiKey) {
            $this->error('No Calendarific API key found. Please set CALENDARIFIC_API_KEY in your .env file.');
            return 1;
        }

        $response = Http::get('https://calendarific.com/api/v2/holidays', [
            'api_key' => $apiKey,
            'country' => 'PH',
            'year' => $year,
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch holidays: ' . $response->body());
            return 1;
        }

        $holidays = $response->json('response.holidays', []);

        $count = 0;

        foreach ($holidays as $holiday) {
            $name = $holiday['name'] ?? 'Unnamed Holiday';
            $date = $holiday['date']['iso'] ?? null;
            $type = $holiday['type'][0] ?? 'Other';
            $description = $holiday['description'] ?? null;

            if (!$date) continue; 
            
            // ✅ Only keep official paid holidays
            if (!in_array($type, [
                'National holiday',
                'Regular Holiday',
                'Special Non-working Holiday'
            ])) {
                continue; // Skip observances or other minor events
            }

            // ✅ Assign pay multiplier automatically
            $multiplier = match ($type) {
                'Regular Holiday', 'National holiday' => 2.0,
                'Special Non-working Holiday' => 1.3,
                default => 1.0,
            };

            \App\Models\Holiday::updateOrCreate(
                ['date' => $date],
                [
                    'name' => $name,
                    'type' => $type,
                    'description' => $description,
                ]
            );

            $count++;
        }

        $this->info("✅ Successfully updated {$count} holidays for {$year}.");
        return 0;
    }
}
