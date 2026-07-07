<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Get all tasks
    public function index()
    {
        return Task::latest()->get();
    }

    // Create task
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'admin_id' => 'required',
            'service_type' => 'required',
            'description' => 'nullable',
            'scheduled_date' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id' => $request->user_id,
            'team_id' => $request->team_id,
            'admin_id' => $request->admin_id,
            'service_type' => $request->service_type,
            'unit' => $request->unit,
            'description' => $request->description,
            'status' => 'pending',
            'scheduled_date' => $request->scheduled_date,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ]);
    }

    // Get tasks by user
    public function byUser($id)
    {
        return Task::where('user_id', $id)->latest()->get();
    }

    // Update task status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $task = Task::findOrFail($id);
        $task->status = $request->status;

        if ($request->status === 'completed') {
            $task->completed_at = now();
        }

        $task->save();

        return response()->json([
            'message' => 'Status updated',
            'task' => $task
        ]);
    }
}