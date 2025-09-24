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
        $validatedData = $request->validated();
        $member_id = Auth::guard('member')->id() 
         ?? Auth::guard('web')->id() 
         ?? Auth::id();
        $team_id = $this->getCurrentTeam()->id();
        $validatedData['team_id'] = $team_id;
        $validatedData['assigned_by_user_id'] = $member_id;
        $validatedData['status'] = 'pending';
        $this->assignedTaskRepository->create($validatedData);
        return redirect()->back()->with('success', 'Task assigned successfully!');
    }
}
