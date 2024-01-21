<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class StudentAchievementServices{
    public static function getAllStudentAchivementRecords(Request $req)
    {
        try {
            $data = \App\Models\Mapping_Student_Achievement::select(
                "ach.id as achievement_id",
                "ach.name as achievement_name",
                "ach.achievement_code as achievement_code",
                "ach.score as achievement_score",
                "s.id as student_id",
                "s.name as student_name",
                "s.NIS",
                "s.NISN",
                "g.id as gender_id",
                "g.code",
                "c.id as classroom_id",
                "c.name as classroom_name",
                "mapping_student_achievements.id",
                "mapping_student_achievements.description",
                "mapping_student_achievements.created_at as timestamp"
            )
             ->leftJoin("achievements as ach", "ach.id", "=", "mapping_student_achievements.achievement_id")
             ->leftJoin("students as s", "s.id", "=", "mapping_student_achievements.student_id")
             ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
             ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
             ->where("s.active_status", true)
             ->where("s.deleted_at", null)
             ->where("ach.active_status", true)
             ->where("ach.deleted_at", null)
             ->get();

            return response()->json(
                [
                    "message" => "success on get data",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to get achievemnet records",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function createMappingStudentAchievement(Request $req)
    {
        try {
            \App\Models\Mapping_Student_Achievement::create(
                [
                    "achievement_id" => $req->achievement_id,
                    "student_id" => $req->student_id,
                    "description" => $req->description
                ]
            );

            return response()->json(
                [
                    "message" => "Success on create attandence permit type",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on create student achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function updateMappingStudentAchievement(Request $req)
    {
        try {
            \App\Models\Mapping_Student_Achievement::where("id", $req->id)->uppdate(
                [
                    "achievement_id" => $req->achievement_id,
                    "student_id" => $req->student_id,
                    "description" => $req->description
                ]
            );
            
            return response()->json(
                [
                    "message" => "Success on update student achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on update student achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function deleteMappingStudentAchievement(Request $req)
    {
        try {
            \App\Models\Mapping_Student_Achievement::where("id", $req->id)->delete();
            
            return response()->json(
                [
                    "message" => "Success on delete student achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on delete student achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function deleteMutlipleMappingStudentAchievement(Request $req)
    {
        try {
            DB::beginTransaction();

            foreach ($req->json as $key => $value) {
                \App\Models\Mapping_Student_Achievement::where("id", $value["id"])->delete();
            }
            
            DB::commit();

            return response()->json(
                [
                    "message" => "Success on delete student achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json(
                [
                    "message" => "Failed on delete student achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }
}