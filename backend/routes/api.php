<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\WorkEntryController;
use App\Models\Holiday;

Route::get('/holidays', function() { 
    return Holiday::orderBy('date')->get();
});

Route::get('/holidays/check/{date}', function ($date) {
    $holiday = Holiday::whereDate('date', $date)->first();
    return $holiday
        ? response()->json(['isHoliday' => true, 'holiday' => $holiday])
        : response()->json(['isHoliday' => false]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::post('/forgot-password', [PasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/work-entries', [WorkEntryController::class, 'index']);
    Route::post('/work-entries', [WorkEntryController::class, 'store']);
});

Route::middleware('auth:sanctum')->get('/user/profile', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'email' => $request->user()->email,
        'created_at' => $request->user()->created_at,
        'updated_at' => $request->user()->updated_at,
    ]);
});