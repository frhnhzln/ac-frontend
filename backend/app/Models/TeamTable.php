<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\TaskAssignment;

class TeamTable extends Model
{
    protected $fillable = [
        'team_name',
        'description'
    ];

    public function members()
    {
        return $this->hasMany(Team::class);
    }

    public function assignments()
    {
        return $this->hasMany(
            TaskAssignment::class,
            'team_id'
        )->with('task');
    }
}