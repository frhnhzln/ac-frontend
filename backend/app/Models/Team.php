<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'team_table_id',
        'name',
        'phone',
        'role',
        'status'
    ];

    public function teamTable()
    {
        return $this->belongsTo(TeamTable::class);
    }
}