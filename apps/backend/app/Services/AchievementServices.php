<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;


class AchievementServices
{
    public static function GetAllAchievements(Request $req)
    {
        try {
            $data = \App\Models\Achievements::select(
                "id",
                "name",
                "description",
                "achievement_code",
                "score",
                "active_status",
            )
             ->orderBy("created_at", "ASC")
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
            \App\Models\Achievements::where("id", $req->id)->update(
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

    public static function DeleteAchievement(Request $req)
    {
        try {
            \App\Models\Achievements::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "Success on delete achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function DeleteMultipleAchievement(Request $req)
    {
        try {
            DB::beginTransaction();

            foreach ($req->json as $key => $value) {
                \App\Models\Achievements::where("id", $value["id"])->delete();
            }

            DB::commit();
            return response()->json(
                [
                    "message" => "Success on delete achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json(
                [
                    "message" => "Failed to delete achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}