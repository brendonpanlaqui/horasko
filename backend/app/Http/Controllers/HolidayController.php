<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    public function index()
    {
        // 1. Fetch holidays for the current and next year (to handle Dec/Jan transitions)
        // 2. Order them by date so they appear nicely in the list
        $holidays = Holiday::whereYear('date', '>=', now()->year)
            ->orderBy('date', 'asc')
            ->get();

        // 3. Return JSON. 
        // Note: Because we used get(), it automatically includes ALL columns
        // including your new 'multiplier'.
        return response()->json($holidays);
    }
    
    public function checkDate($date)
    {
        $holiday = Holiday::whereDate('date', $date)->first();

        return $holiday
            ? response()->json(['isHoliday' => true, 'holiday' => $holiday])
            : response()->json(['isHoliday' => false]);
    }
}