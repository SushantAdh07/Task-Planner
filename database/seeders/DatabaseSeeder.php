<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        

        Task::create([
            'user_id' => 1,
            'task_name' => 'hey',
            'task_description' => 'mate',
            'selected_date'=> '2025-02-25'
        ]);

        /*User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'admin123',
            'role' => 'admin',
        ]);
        

        User::create([
            'name' => 'user1',
            'email' => 'user@user.com',
            'password' => 'user123',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'user2',
            'email' => 'user2@user.com',
            'password' => 'user1234',
            'role' => 'user',
        ]); */
    }

}
