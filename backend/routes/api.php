<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

// PUBLIC AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// PROTECTED ROUTES
Route::middleware('auth:sanctum')->group(function () {

    // TASKS
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/me', [TaskController::class, 'myTasks']);
    Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

    // AUTH
    Route::post('/logout', [AuthController::class, 'logout']);
});