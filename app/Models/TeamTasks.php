<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Psy\CodeCleaner\FunctionReturnInWriteContextPass;

class TeamTasks extends Model
{
    protected $guarded = [];

    public function members(){
        return $this->belongsTo(Member::class);
    }
}
