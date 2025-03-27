<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function comments(Task $task){
        $comments = $task->comments()->with('users')->latest()->get();

        return Inertia::render('Components/Main', [
            'comments' => $comments,
        ]);
    }
}
