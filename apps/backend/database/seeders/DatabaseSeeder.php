<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\User::create([
            'name' => "admin",
            'email' => "admin@email.com",
            'email_verified_at' => now(),
            'password' => Hash::make("smktelkombandung@2024"), // password
            'remember_token' => Str::random(10),
        ]);
    }
}
