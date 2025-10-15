<?php

namespace App\Repositories;

use App\Models\AssignedTask;
use Illuminate\Database\Eloquent\Collection;

interface AssignedTaskRepositoryInterface
{
    
    public function findById(int $id): ?AssignedTask;

    
    public function getTasksByUser(): Collection;

    
    public function getCompletedTasksByUser(int $userId): Collection;

    
    public function create(array $data): AssignedTask;

    
    public function update(int $id, array $data): bool;

    
    public function delete(int $id): bool;
}
