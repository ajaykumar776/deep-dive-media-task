<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    public function run()
    {
        $user = User::where('email', 'admin@gmail.com')->first();

        // Create the user if not exists
        if (!$user) {
            $user = User::create([
                'name'     => 'Admin User',
                'email'    => 'admin@gmail.com',
                'password' => Hash::make('admin@123'), // Default password
            ]);
            $this->command->info('User with email admin@gmail.com created.');
        } else {
            $this->command->info('User with email admin@gmail.com already exists.');
        }

        if ($user) {
            $faker = Faker::create(); // Create a Faker instance

            // Define the start and end dates of the current month
            $startOfMonth = Carbon::now()->startOfMonth();
            $endOfMonth = Carbon::now()->endOfMonth();

            // Create 100 tasks for this user
            foreach (range(1, 100) as $index) {
                Task::create([
                    'title'       => $faker->sentence(3), // Generate a random title
                    'description' => $faker->paragraph,   // Generate a random description
                    'status'      => $faker->randomElement(['pending', 'in_progress', 'completed']),
                    'due_date'    => $faker->dateTimeBetween($startOfMonth, $endOfMonth)->format('Y-m-d'), // Random date within this month
                    'priority'    => $faker->numberBetween(1, 5), // Random priority between 1 and 5
                    'user_id'     => $user->id,
                ]);
            }

            $this->command->info('100 tasks created successfully.');
        } else {
            $this->command->info('User with email admin@gmail.com not found.');
        }
    }
}
