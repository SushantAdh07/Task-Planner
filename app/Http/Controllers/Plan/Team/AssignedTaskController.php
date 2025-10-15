<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignedTaskRequest;
use App\Repositories\AssignedTaskRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Traits\AuthTrait;
use Inertia\Inertia;

class AssignedTaskController extends Controller
{
    use AuthTrait;

    protected $assignedTaskRepository;

    public function __construct(AssignedTaskRepositoryInterface $assignedTaskRepository)
    {
        $this->assignedTaskRepository = $assignedTaskRepository;
    }

    public function showAssignedTasks()
    {
        $assignedTasks = $this->assignedTaskRepository->getTasksByUser();

        dump($assignedTasks);

        return Inertia::render('Components/Team/TeamMain', [
            'assignedTasks' => $assignedTasks,
        ]);
    }

    public function store(AssignedTaskRequest $request)
    {
        $validatedData = $request->validated();

        $assignedByUserId = Auth::guard('member')->id()
            ?? Auth::guard('web')->id()
            ?? Auth::id();

        $teamId = $this->getCurrentTeam()->id;

        $dataToCreate = array_merge($validatedData, [
            'team_id' => $teamId,
            'assigned_by_user_id' => $assignedByUserId,
            'status' => 'pending',
        ]);

        $this->assignedTaskRepository->create($dataToCreate);

        return redirect()->back()->with([
            'message' => 'Task Assigned Successfully',
            'type' => 'success'
        ]);
    }
}
