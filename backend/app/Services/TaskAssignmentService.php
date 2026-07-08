<?php

namespace App\Services;

use App\Models\Task;
use App\Models\TeamTable;
use App\Models\TaskAssignment;
use Carbon\Carbon;

class TaskAssignmentService
{
    public function assignTask(Task $task)
    {
        $today = Carbon::today();

        // Get teams with today's assigned task count
        $teams = TeamTable::withCount([
            'assignments as today_tasks' => function($query) use ($today){
                $query->whereDate(
                    'scheduled_date',
                    $today
                );
            }
        ])
        ->get();

        // Find team with lowest workload
        $availableTeam = $teams
            ->where('today_tasks','<',7)
            ->sortBy('today_tasks')
            ->first();

        if(!$availableTeam){
            return null;
        }

        // Get current sequence
        $sequence = TaskAssignment::where(
                'team_id',
                $availableTeam->id
            )
            ->whereDate(
                'scheduled_date',
                $today
            )
            ->count()+1;

        // Create assignment
        $assignment = TaskAssignment::create([
            'task_id'=>$task->id,
            'team_id'=>$availableTeam->id,
            'scheduled_date'=>$today,
            'sequence'=>$sequence,
            'distance'=>null,
            'status'=>'assigned'
        ]);

        return $assignment;
    }
}