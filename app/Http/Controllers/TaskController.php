<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\TaskStoreRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
        $users = User::latest()->get();
    
        // Fetch tasks based on user role
        
            $tasks = Task::latest()->get();
        
    
        return Inertia::render('Components/Main', [
            'auth' => ['user' => $user],
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }

    public function createTask(Task $task, TaskStoreRequest $request){
        $task->create(
            $request->validated()
        );


        return Inertia::location(route('index'));
    }

    public function editTask(Task $task, TaskStoreRequest $request){

        $task->update($request->validated());

        return Inertia::location(route('index'));
    }

    public function deleteTask($id){
        Task::findOrFail($id)->delete();
        return Inertia::location(route('index'));
    }
}
