<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    public function task(){
        return $this->belongsTo(TeamTasks::class, 'task_id');
    }

    public function member(){
        return $this->belongsTo(Member::class);
    }
}
