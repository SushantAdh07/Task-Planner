<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tasks(){
        return $this->belongsTo(Task::class);
    }

    public function members(){
        return $this->belongsTo(Member::class);
    }
}
