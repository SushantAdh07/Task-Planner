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

    public function createTask(Request $request){
        
        Task::create([
            'user_id' => $request->user_id,
            'task_name' => $request->task_name,
            'task_description' =>$request->task_description,
            'selected_date' => $request->selected_date,
        ]);

        return Inertia::render('Components/Main')->with('success', 'Task Added.');
    }

    public function editTask(Request $request, $id){

        $task = Task::findOrFail($id);
        $task->update([
            'task_name' => $request->task_name,
            'task_description' =>$request->task_description,
            'selected_date' => $request->selected_date,
        ]);

        return Inertia::render('Components/Main')->with('success', 'Task Updated.');
    }

    public function deleteTask($id){
        Task::findOrFail($id)->delete();
        return Inertia::location(route('index'));
    }
}
