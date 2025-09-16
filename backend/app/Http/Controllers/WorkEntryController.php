<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkEntry;

class WorkEntryController extends Controller {
    public function index(Request $request) {
        $entries = WorkEntry::where('user_id', $request->user()->id)->get();

        return response()->json(['entries' => $entries]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'date' => 'required|integer',
            'hours' => 'required|numeric|min:0.1',
        ]);

        $workEntry = WorkEntry::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'date' => $validated['date'],
            ],
            [
                'hours' => $validated['hours'],
            ]
        );

        return response()->json(['message' => 'Entry saved', 'data' => $workEntry], 200);
    }

    public function sync(Request $request) {
        $user = $request->user();

        $entries = $request->all();

        if (!is_array($entries)) {
            return response()->json(['error' => 'Invalid data format.'], 422);
        }

        foreach ($entries as $entry) {
            if (!isset($entry['date']) || !isset($entry['hours'])) {
                continue;
            }

            WorkEntry::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'date' => $entry['date'],
                ],
                [
                    'hours' => $entry['hours'],
                ]
            );
        }

        return response()->json(['message' => 'Entries synced successfully.']);
    }
}