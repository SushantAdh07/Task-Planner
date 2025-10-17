<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignedTask extends Model
{
    protected $fillable = [
        'user_id', 'team_id', 'assigned_tasks', 'priority', 'status', 'assigned_by_user_id', 'due_date',
    ];

    public function member(){
        return $this->belongsTo(Member::class, 'assigned_by_user_id');
    }
}
