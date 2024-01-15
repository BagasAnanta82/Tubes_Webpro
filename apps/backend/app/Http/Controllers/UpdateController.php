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
        return \App\Services\AchievementServices::UpdateAchievement($req);
    }

    public function UpdateStudentAttandencePermit(Request $req)
    {
        try {
            if (! $req->hasFile("document")) {
                throw new Exception("No File Included", 1);
            }

            // Delete Old Document
            $data = \App\Models\Attandence_Permit::select("document_id")->where("id", $req->attandence_permit_id)->first();
            \App\Models\Document::where("id", $data->document_id)->delete();

            // Create new document
            $document_url = Storage::url($req->file("document")->store("public/permits"));
            
            $document = \App\Models\Document::create(
                [
                    "name" => $req->file("document")->getName(),
                    "document_type" => $req->file("document")->getType(),
                    "url" => $document_url
                ]
            );

            \App\Models\Attandence_Permit::where("id", $req->attandence_permit_id)->update(
                [
                    "student_id" => $req->student_id,
                    "attandence_permit_type_id" => $req->attandence_permit_type_id,
                    "document_id" => $document->id
                ]
            );

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
