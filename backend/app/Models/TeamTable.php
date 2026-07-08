<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}