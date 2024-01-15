<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use DB;

class AuthenticationServices
{
    private static function getUserTokenRes(Request $req)
    {
        try {
            $user = \App\Models\User::where("email", $req->email)->firstOrFail();

            if (!Hash::check($req->password, $user->password)) {
                throw new Exception("Gagal auth user", 1);
            }

            return response()->json(
                [
                    "message" => "Success to auth user",
                    "status" => true,
                    "data" => [
                        "email" => $user->email,
                        "token" => $user->createToken("auth-token")->plainTextToken
                    ]
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to auth user",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function AuthUser(Request $req)
    {
        $validate = Validator::make($req->all(), [
            "email" => 'required',
            "password" => "required"
        ]);

        if ($validate->fails()) {
            return response()->json([
                "message" => "Failed to auth user",
                "status" => false,
                "error" => $validate->errors()
            ]);
        }
        
        return AuthenticationServices::getUserTokenRes($req);
    }

    private static function InsertNewUser(Request $req)
    {
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
                ], 500
            );
        }
    }

    public static function CreateNewUser(Request $req)
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

        return AuthenticationServices::InsertNewUser($req);
    }
}