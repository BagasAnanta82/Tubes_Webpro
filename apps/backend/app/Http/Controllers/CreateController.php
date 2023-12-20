<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class CreateController extends Controller
{
    public function createUser(Request $req)
    {
        $validation = Validator::make($req->all(), [
            "email" => "required",
            "password" => "required"
        ]);

        if ($validation->fails()){
            return response()->json(
                [
                    "message" => "Failed to create user",
                    "status" => false,
                    "error" => $validation->errors()
                ]
            );
        }

        try {
            \App\Models\User::create([
                "name" => strstr($req->email, "@", true),
                "email" => $req->email,
                "password" => Hash::make($req->password),
                "email_verified_at" => now(),
                'remember_token' => Str::random(10)
            ]);

            return response()->json(
                [
                    "message" => "Success to create user",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to create user",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}
