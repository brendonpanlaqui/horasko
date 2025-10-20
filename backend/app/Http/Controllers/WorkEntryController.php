<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkEntry;
use Illuminate\Support\Facades\Auth;

class WorkEntryController extends Controller {
    public function index(Request $request) {
        $user = $request->user();

        $today = now();

        if ($today->day <= 15) {
            // 1st to 15th
            $start = $today->copy()->startOfMonth();
            $end = $today->copy()->day(15)->endOfDay();
        } else {
            // 16th to last day of month
            $start = $today->copy()->day(16)->startOfDay();
            $end = $today->copy()->endOfMonth()->endOfDay();
        }
        $entries = WorkEntry::where('user_id', $user->id)
            ->whereBetween('date', [$start, $end])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($entries);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'date' => 'required|date',
            'hours' => 'required|numeric|min:1|max:24',
        ]);

        $entry = WorkEntry::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'date' => $validated['date'],
            ],
            ['hours' => $validated['hours']]
        );

        return response()->json($entry, 200);
    }
}