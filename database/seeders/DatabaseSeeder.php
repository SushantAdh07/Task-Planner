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

        

        /* Task::create([
            'user_id' => 1,
            'task_name' => 'hey',
            'task_description' => 'mate',
            'selected_date'=> '2025-02-25'
        ]); */

        User::create([
            'name' => 'Jagadish Prasad Adhikari',
            'email' => 'jp@admin.com',
            'password' => 'admin123',
            'role' => 'admin',
        ]);
        

        User::create([
            'name' => 'Sushant Adhikari',
            'email' => 'sushant@user.com',
            'password' => 'sushant@1',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Sashi Shrestha',
            'email' => 'sashi@user.com',
            'password' => 'sashi@2',
            'role' => 'user',
        ]); 

        User::create([
            'name' => 'Loknath Dahal',
            'email' => 'Loknath@user.com',
            'password' => 'loknath@3',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Ramila Gautam',
            'email' => 'Ramila@user.com',
            'password' => 'ramila@4',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Sangita Kafle',
            'email' => 'Sangita@user.com',
            'password' => 'sangita@5',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Nabaraj Soti',
            'email' => 'Nabaraj@user.com',
            'password' => 'nabaraj@6',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Tara Nidhi Pyakurel',
            'email' => 'Taranidhi@user.com',
            'password' => 'taranidhi@7',
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Swosti Shrestha',
            'email' => 'swosti@user.com',
            'password' => 'swosti@8',
            'role' => 'user',
        ]);

    }

}
