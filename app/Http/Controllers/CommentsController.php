<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentsController extends Controller
{


    public function createComments(Request $request, Task $task)
    {
        $request->validate([
            'comment' => 'required|string|max:2000',
        ]);

        $comment = $task->comments()->create([
            'comment' => $request->comment,
            'user_id' => Auth::id()
        ])->load('user');

        return redirect()->back()->with([
            'success' => 'Comment added successfully',
            'newComment' => $comment // Pass the new comment with user data
        ]);
    }
}
