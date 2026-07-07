<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'status'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
