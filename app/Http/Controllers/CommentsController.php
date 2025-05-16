<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentsController extends Controller
{
    public function index(Task $task)
    {
        $comments = $task->comments()->with('users')->latest()->get();

        return Inertia::render('Components/Main', [
            'comments' => $comments,
        ]);
    }

    public function createComments(Request $request, Task $task)
    {
        $request->validate([
            'comment' => 'required|string|max:2000',
        ]);

        $comment = $task->comments()->create([
            'comment' => $request->comment,
            'user_id' => Auth::id()
        ]);

        return back()->with('success', 'Comment added successfully');
    }
}
