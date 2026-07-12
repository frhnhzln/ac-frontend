<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\GeocodingService;
use Illuminate\Http\Request;
use App\Services\TaskAssignmentService;
use App\Models\TaskAssignment;

class TaskController extends Controller
{
    // Get all tasks
    public function index()
    {
        return Task::latest()->get();
    }

    // Create task
    public function store(Request $request, GeocodingService $geocodingService, TaskAssignmentService $assignmentService)
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

        // Get latitude & longitude from address
        $location = $geocodingService->getCoordinates($request->address);

        $task = Task::create([
            'customer_name' => $request->customer_name,
            'phone' => $request->phone,
            'address' => $request->address,
            'unit' => $request->unit,
            'description' => $request->description,
            'deal_time' => $request->deal_time,
            'status' => $request->status ?? 'pending',
            'scheduled_date' => now(),

            'latitude' => $location['lat'] ?? null,
            'longitude' => $location['lng'] ?? null,
        ]);

        $assignment = $assignmentService->assignTask($task);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
            'assignment'=>$assignment
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
            'status' => 'required|in:pending,assigned,completed,cancelled',
        ]);

        $task = Task::findOrFail($id);
        $task->status = $request->status;

        if ($request->status === 'completed') {
            $task->completed_at = now();
        }

        $task->save();

        if ($request->status === 'cancelled') {
            TaskAssignment::where('task_id', $task->id)
                ->update([
                    'status' => 'cancelled'
                ]);
            $task->save();
        }

        return response()->json([
            'message' => 'Status updated',
            'task' => $task
        ]);
    }
}