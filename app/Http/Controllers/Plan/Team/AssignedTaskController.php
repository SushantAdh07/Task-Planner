<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignedTaskRequest;
use App\Repositories\AssignedTaskRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AssignedTaskController extends Controller
{
    protected $assignedTaskRepository;

    public function __construct(AssignedTaskRepositoryInterface $assignedTaskRepository)
    {
        $this->assignedTaskRepository = $assignedTaskRepository;
    }

   
    public function store(AssignedTaskRequest $request)
    {

        $validatedData = $request->validated();
        $member_id = Auth::guard('member')->id;
        $validatedData['assigned_by_user_id'] = $member_id;
        $validatedData['status'] = 'pending';

        $this->assignedTaskRepository->create($validatedData);

        return redirect()->back()->with('success', 'Task assigned successfully!');
    }
}
