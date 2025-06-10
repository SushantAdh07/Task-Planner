<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Psy\CodeCleaner\FunctionReturnInWriteContextPass;

class TeamTasks extends Model
{
    protected $guarded = [];

    public function member(){
        return $this->belongsTo(Member::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class, 'task_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
