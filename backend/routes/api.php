<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaskController;

// PUBLIC AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// FORGOT PASSWORD
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// PROTECTED ROUTES
Route::middleware('auth:sanctum')->group(function () {

    // TASKS
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    // Route::get('/tasks/me', [TaskController::class, 'myTasks']);
    Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

    // AUTH
    Route::post('/logout', [AuthController::class, 'logout']);
});