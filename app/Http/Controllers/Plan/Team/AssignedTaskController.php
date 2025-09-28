<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignedTaskRequest;
use App\Repositories\AssignedTaskRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Traits\AuthTrait;

class AssignedTaskController extends Controller
{
    use AuthTrait;

    protected $assignedTaskRepository;

    public function __construct(AssignedTaskRepositoryInterface $assignedTaskRepository)
    {
        $this->assignedTaskRepository = $assignedTaskRepository;
    }

   
    public function store(AssignedTaskRequest $request)
    {
        // Validation now passes for fields sent from the frontend (assigned_task, user_id, due_date, priority)
        $validatedData = $request->validated();
        
        // Determine the ID of the user assigning the task
        $assignedByUserId = Auth::guard('member')->id() 
            ?? Auth::guard('web')->id() 
            ?? Auth::id();
        
        // Compute IDs required for the database insertion
        $teamId = $this->getCurrentTeam()->id;
        
        // Merge the calculated IDs with the validated data
        $dataToCreate = array_merge($validatedData, [
            'team_id' => $teamId,
            'assigned_by_user_id' => $assignedByUserId,
            'status' => 'pending',
            // NOTE: 'user_id' is the assignee ID, already present in $validatedData
        ]);

        // Create the task
        $this->assignedTaskRepository->create($dataToCreate);
        
        // IMPORTANT: Returning a simple back response is generally cleaner for Inertia POST requests
        return back()->with('success', 'Task assigned successfully!');
    }
}
