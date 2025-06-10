<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\User;
use App\Models\Task;
use App\Models\Team;
use App\Models\TeamTasks;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        TeamTasks::create([
            'member_id' => '3',
            'team_id' => '2',
            'task_name' => 'Team Task',
            'task_description' => 'Test of Team Task Description',
            'selected_date' => '2025-06-19'
        ]);
    }

}
