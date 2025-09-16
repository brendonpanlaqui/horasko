<?php

use App\Http\Controllers\WorkEntryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Support\Facades\Route;

// Public auth routes
Route::get('/sanctum/csrf-cookie', [AuthController::class, 'csrf']); // CSRF route
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Work entries
    Route::post('/work-entries/sync', [WorkEntryController::class, 'sync']);
    Route::post('/work-entries', [WorkEntryController::class, 'store']);
    Route::get('/work-entries', [WorkEntryController::class, 'index']);
});
