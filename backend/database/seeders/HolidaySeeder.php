<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Holiday;

class HolidaySeeder extends Seeder
{
    public function run() {
        Holiday::truncate();

        $holidays = [
            [
                'date' => '2025-01-01',
                'name' => "New Year's Day",
                'type' => 'Regular Holiday',
                'description' => 'First day of the year',
                'multiplier' => 2, 
            ],
            [
                'date' => '2025-12-25',
                'name' => 'Christmas Day',
                'type' => 'Regular Holiday',
                'description' => 'Christmas',
                'multiplier' => 2,
            ],
            [
                'date' => '2025-11-30',
                'name' => 'Bonifacio Day',
                'type' => 'Special Non-working Holiday',
                'description' => 'Philippine hero day',
                'multiplier' => 1.3, 
            ],
        ];

        foreach ($holidays as $h) {
            Holiday::create($h);
        }
    }
}
