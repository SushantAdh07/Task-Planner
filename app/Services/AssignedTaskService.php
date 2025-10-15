<?php

namespace App\Services;

use App\Repositories\AssignedTaskRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;

class AssignedTaskService
{
    public function __construct(protected AssignedTaskRepositoryInterface $assignedTaskRepository) {}

    public function getAssignedTasksData()
    {
        return $this->assignedTaskRepository->getTasksByUser();
    }
}