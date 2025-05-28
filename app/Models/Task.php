<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'task_name',
        'task_description',
        'user_id',
        'selected_date',
        'status'
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function members(){
        return $this->belongsTo(Member::class);
    }
}
