<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'customer_name',
        'phone',
        'address',
        'unit',
        'description',
        'deal_time',
        'status',
        'scheduled_date',
        'completed_at',
    ];

}