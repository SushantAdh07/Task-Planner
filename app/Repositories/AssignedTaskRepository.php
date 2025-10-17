<?php

namespace App\Repositories;

use App\Models\AssignedTask;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class AssignedTaskRepository implements AssignedTaskRepositoryInterface
{
    public function findById(int $id): ?AssignedTask
    {
        return AssignedTask::find($id);
    }

    public function getTasksByUser(): Collection
    {
         $currentUser = Auth::guard('member')->id();
         return AssignedTask::where('user_id', $currentUser)->select('assigned_tasks', 'priority', 'assigned_by_user_id')->with('member')->get();
    }

    public function getCompletedTasksByUser(int $userId): Collection
    {
        return AssignedTask::where('user_id', $userId)->whereNotNull('completed_at')->with('task')->get();
    }

    public function create(array $data): AssignedTask
    {
        return AssignedTask::create($data);
    }

    public function update(int $id, array $data): bool
    {
        return AssignedTask::where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        return AssignedTask::destroy($id);
    }
}
