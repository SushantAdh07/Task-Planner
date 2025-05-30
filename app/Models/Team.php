<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['user_id', 'team_name', 'team_size'];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function members(){
        return $this->hasMany(Member::class);
    }

    
}
