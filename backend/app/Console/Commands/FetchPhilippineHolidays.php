<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Holiday;
use Carbon\Carbon;

class FetchPhilippineHolidays extends Command {
    protected $signature = 'holidays:fetch {year?}';
    protected $description = 'Fetch Philippine holidays from Calendarific API';

    public function handle() {
        $year = $this->argument('year') ?? now()->year;
        $apiKey = env('CALENDARIFIC_API_KEY');

        if (!$apiKey) {
            $this->error('Missing CALENDARIFIC_API_KEY in .env');
            return 1;
        }

        $this->info("Fetching holidays for {$year}...");

        $response = Http::get('https://calendarific.com/api/v2/holidays', [
            'api_key' => $apiKey,
            'country' => 'PH',
            'year'    => $year,
        ]);

        if ($response->failed()) {
            $this->error('API Error: ' . $response->body());
            return 1;
        }

        $holidays = $response->json('response.holidays', []);
        $count = 0;

        foreach ($holidays as $holiday) {
            $name = $holiday['name'] ?? 'Unnamed Holiday';
            $rawDate = $holiday['date']['iso'] ?? null;
            $type = $holiday['type'][0] ?? 'Other';
            $description = $holiday['description'] ?? null;

            if (!$rawDate) continue;

            // FIX 1: Ensure Date is STRICTLY YYYY-MM-DD for React compatibility
            // Calendarific sometimes returns timestamps. We chop off the time.
            $date = substr($rawDate, 0, 10);

            // FIX 2: Filter Logic (Case-insensitive check is safer)
            // PH "Regular Holiday" often comes in as "National holiday" from APIs
            $isPaidHoliday = false;
            $validTypes = ['National holiday', 'Regular Holiday', 'Special Non-working Holiday'];
            
            foreach ($validTypes as $vType) {
                if (stripos($type, $vType) !== false) {
                    $isPaidHoliday = true;
                    break;
                }
            }

            if (!$isPaidHoliday) continue;

            // FIX 3: Assign Multiplier based on PH Labor Law
            // Regular/National = 200% (2.0), Special = 130% (1.3)
            $multiplier = 1.0;
            if (stripos($type, 'Special') !== false) {
                $multiplier = 1.3;
            } elseif (stripos($type, 'National') !== false || stripos($type, 'Regular') !== false) {
                $multiplier = 2.0;
            }

            // FIX 4: ACTUALLY SAVE THE MULTIPLIER
            Holiday::updateOrCreate(
                ['date' => $date], // Unique constraint
                [
                    'name'        => $name,
                    'type'        => $type,
                    'description' => $description,
                    'multiplier'  => $multiplier, // <--- THIS WAS MISSING
                ]
            );

            $count++;
        }

        $this->info("✅ Success! Updated {$count} holidays for {$year}.");
        return 0;
    }
}