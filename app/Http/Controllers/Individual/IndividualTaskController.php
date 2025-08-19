<?php

namespace App\Http\Controllers\Individual;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;

class IndividualTaskController extends Controller
{
    public function createTask(Task $task, TaskStoreRequest $request){
        $task->create(
            $request->validated()
        );

        return back()->with('success', 'Task added successfully');
    }

    public function editTask($id, UpdateTaskRequest $request){

        $tasks = Task::findOrFail($id);

        $tasks->update($request->validated());

        return back();
    }

    public function deleteTask($id){
        Task::findOrFail($id)->delete();
        return back();
    }

}
