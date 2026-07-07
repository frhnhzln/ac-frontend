<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
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
            'customer_name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'unit' => 'required',
            'description' => 'nullable',
            'deal_time' => 'nullable',
            'status' => 'nullable',
        ]);

        $task = Task::create([
            'customer_name' => $request->customer_name,
            'phone' => $request->phone,
            'address' => $request->address,
            'unit' => $request->unit,
            'description' => $request->description,
            'deal_time' => $request->deal_time,
            'status' => $request->status ?? 'pending',
            'scheduled_date' => now(),
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