<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public function UpdateClassroom(Request $req)
    {
        try {
            \App\Models\Classroom::where("id", $req->id)->update(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_Status
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update classroom",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update classroom",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function UpdateStudent(Request $req)
    {
        try {
            \App\Models\Student::where("id", $req->student_id)->update(
                [
                    "NIS" => $req->NIS,
                    "NISN" => $req->NISN,
                    "Name" => $req->Name,
                    "gender_id" => $req->gender_id,
                    "classromm_id" => $req->classroom_id
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update student",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function UpdateViolation(Request $req)
    {
        try {
            \App\Models\Violation::where("id", $req->violation_id)->update(
                [
                    "name" => $req->name,
                    "violation_code" => $req->violation_code,
                    "score" => $req->score,
                    "active_status" => $req->active_status,
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function UpdateAchievement(Request $req)
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
