<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use DB;

class AchievementServices
{
    public static function GetAllAchievements(Request $req)
    {
        try {
            $data = \App\Models\Achievements::select(
                "name",
                "description",
                "achievement_code",
                "score",
                "active_status",
            )
             ->orederBy("created_at", "ASC")
             ->get();

            return response()->json(
                [
                    "message" => "Success on get achievement",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get Data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function CreateAchievement(Request $req)
    {
        try {
            \App\Models\Achievements::create(
                [
                    "name" => $req->name,
                    "description" => $req->description,
                    "achievement_code" => $req->achievement_code,
                    "score" => $req->score,
                    "active_status" => $req->active_status,
                ]
            );

            return response()->json(
                [
                    "message" => "success on create achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to create achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function UpdateAchievement(Request $req)
    {
        try {
            \App\Models\Achievements::where("id", $req->achievement_id)->update(
                [
                    "name" => $req->name,
                    "achievement_code" => $req->achievement_code,
                    "score" => $req->score,
                    "active_status" => $req->active_status,
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}