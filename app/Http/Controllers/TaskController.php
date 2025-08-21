<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\TeamTasks;

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

    public function createTask(TeamTasks $team_tasks, TaskStoreRequest $request){
        $team_tasks->create(
            $request->validated()
        );

        return back()->with('success', 'Task added successfully');
    }

    public function editTask($id, UpdateTaskRequest $request){

        $team_tasks = TeamTasks::findOrFail($id);
        
        $team_tasks->update($request->validated());

        return back();
    }

    public function deleteTask($id){
        TeamTasks::findOrFail($id)->delete();
        return back();
    }
}
