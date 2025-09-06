<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignedTask extends Model
{
    protected $fillable = [
        'user_id', 'task_id','team_id', 'priority', 'status', 'assigned_by_user_id', 'due_date',
    ];
}
