<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpdateController extends Controller
{
    public function UpdateClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::UpdateClassroom($req);
    }

    public function UpdatePermitType(Request $req)
    {
        try {
            \App\Models\Attandence_Permit_Type::where("id", $req->attandence_permit_type_id)->update(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_status
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

    public function UpdateStudent(Request $req)
    {
        return \App\Services\StudentServices::updateStudent($req);
    }

    public function UpdateViolation(Request $req)
    {
        return \App\Services\ViolationServices::updateViolation($req);
    }

    public function UpdateAchievement(Request $req)
    {
        return \App\Services\AchievementServices::UpdateAchievement($req);
    }

    public function UpdateMappingStudentAchievement(Request $req)
    {
        return \App\Services\StudentAchievementServices::updateMappingStudentAchievement($req);
    }

    public function UpdateStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::updateStudentPermit($req);
    }
}
