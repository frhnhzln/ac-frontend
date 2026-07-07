<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\DashboardController;

// PUBLIC AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// FORGOT PASSWORD
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

// AUTH
Route::post('/logout', [AuthController::class, 'logout']);