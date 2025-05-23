<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
        $users = User::latest()->get();
        $tasks = Task::with(['comments.user'])->latest()->get();
        
    
        return Inertia::render('Components/Team/TeamMain', [
            'auth' => ['user' => $user],
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }

    public function createTask(Task $task, TaskStoreRequest $request){
        $task->create(
            $request->validated()
        );
        session()->flash('message', 'Task added successfully!');
        logger('Flash message set:', ['message' => session('message')]);

        return Inertia::location(route('index'));
    }

    public function editTask(Task $task, UpdateTaskRequest $request){

        $task->update($request->validated());

        return Inertia::location(route('index'));
    }

    public function deleteTask($id){
        Task::findOrFail($id)->delete();
        return Inertia::location(route('index'));
    }
}
