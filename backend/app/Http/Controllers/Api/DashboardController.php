<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([

            "total_tasks" => Task::count(),

            "pending_tasks" => Task::where(
                'status',
                'pending'
            )->count(),

            "completed_tasks" => Task::where(
                'status',
                'completed'
            )->count(),

        ]);
    }
}