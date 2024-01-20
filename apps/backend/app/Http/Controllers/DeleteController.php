<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Storage;

class DeleteController extends Controller
{
    public function DeleteStudent(Request $req)
    {
        return \App\Services\StudentServices::deleteStudent($req);
    }

    public function DeleteMultipleStudent(Request $req)
    {
        return \App\Services\StudentServices::deleteMultipleStudent($req);
    }

    public function DeleteMultipleClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::DeleteMultipleClassroom($req);
    }

    public function DeleteAchievement(Request $req)
    {
        return \App\Services\AchievementServices::DeleteAchievement($req);
    }

    public function DeleteMultipleAchievement(Request $req)
    {
        return \App\Services\AchievementServices::DeleteMultipleAchievement($req);
    }

    public function DeleteViolation(Request $req)
    {
        try {
            \App\Models\Violation::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "Success on delete violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function DeleteClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::DeleteClassroom($req);
    }

    public function DeleteStudentAttandencePermit(Request $req)
    {
        try {
            \App\Models\Attandence_Permit::where("id", $req->attandence_permit_id)->delete();

            return response()->json(
                [
                    "message" => "Success on update student permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update student permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}
