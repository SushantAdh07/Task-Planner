<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Member extends Authenticatable
{
    protected $fillable = [
        'team_id',
        'name',
        'email',
        'password',
        'role',
        'status',
    ];

    protected $hidden = [
        'password',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function teamTasks(){
        return $this->hasMany(TeamTasks::class);
    }
}
