<?php

namespace App\Repositories;

use App\Models\AssignedTask;
use Illuminate\Database\Eloquent\Collection;

class AssignedTaskRepository implements AssignedTaskRepositoryInterface
{
    public function findById(int $id): ?AssignedTask
    {
        return AssignedTask::find($id);
    }

    public function getTasksByUser(int $userId): Collection
    {
        return AssignedTask::where('user_id', $userId)->with('task')->orderBy('priority', 'desc')->get();
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