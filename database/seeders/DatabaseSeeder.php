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
            'member_id' => '20',
            'team_id' => '5',
            'task_name' => 'Sabita Task',
            'task_description' => 'Sabita Test of Team Task Description',
            'selected_date' => '2025-06-20'
        ]);
    }

}
