<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\WorkEntryController;
use App\Http\Controllers\HolidayController;

Route::get('/holidays', [HolidayController::class, 'index']);
Route::get('/holidays/check/{date}', [HolidayController::class, 'checkDate']);

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