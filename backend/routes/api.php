<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TeamTableController;
use App\Http\Controllers\Api\TeamMemberController;

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

// Team
Route::get('/team-tables', [TeamTableController::class, 'index']);
Route::post('/team-tables', [TeamTableController::class, 'store']);
Route::get('/team-tables/{id}', [TeamTableController::class, 'show']);
Route::put('/team-tables/{id}', [TeamTableController::class, 'update']);
Route::delete('/team-tables/{id}', [TeamTableController::class, 'destroy']);

// Team Members
Route::post('/team-tables/{id}/members', [TeamMemberController::class, 'store']);
Route::put('/members/{id}', [TeamMemberController::class, 'update']);
Route::delete('/members/{id}', [TeamMemberController::class, 'destroy']);