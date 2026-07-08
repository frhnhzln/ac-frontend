<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TaskAssignment extends Model
{
    protected $fillable = [
        'task_id',
        'team_id',
        'scheduled_date',
        'sequence',
        'distance',
        'status',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }


    public function team()
    {
        return $this->belongsTo(TeamTable::class,'team_id');
    }
}