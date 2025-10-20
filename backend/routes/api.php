<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\WorkEntryController;

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