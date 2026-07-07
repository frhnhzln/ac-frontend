<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'customer_id',
        'team_id',
        'user_id',
        'ac_type',
        'unit',
        'status',
        'scheduled_date',
        'completed_at',
    ];

    // Task belongs to customer (from WhatsApp)
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Task assigned to team (technician)
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    // Task created by admin/user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
