<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'task_name' => fake()->title(),
            'task_description' => fake()->paragraph(),
            'selected_date' => fake()->dateTimeBetween('2025-02-01', '2025-02-28')->format('Y-m-d'),
        ];
    }
}
