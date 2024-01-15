<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class CreateController extends Controller
{
    public function createUser(Request $req)
    {
        return \App\Services\AuthenticationServices::CreateNewUser($req);
    }

    public function CreateStudent(Request $req)
    {
        try {
            \App\Models\Student::create(
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
                    "message" => "Success on created student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to create student",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public function CreateClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::CreateClassroom($req);
    }

    public function CreateAchievement(Request $req)
    {
        return \App\Services\AchievementServices::CreateAchievement($req);
    }

    public function CreateViolation(Request $req)
    {
        try {
            \App\Models\Violation::create(
                [
                    "name" => $req->name,
                    "violation_code" => $req->violation_code,
                    "score" => $req->score,
                    "active_status" => $req->active_status,
                ]
            );

            return response()->json(
                [
                    "message" => "success on create violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to create violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public function CreateStudentAttandencePermit(Request $req)
    {
        try {
            if (! $req->hasFile("document")) {
                throw new Exception("No File Included", 1);
            }

            $document_url = Storage::url($req->file("document")->store("public/permits"));

            $document = \App\Models\Document::create(
                [
                    "name" => $req->file("document")->getName(),
                    "document_type" => $req->file("document")->getType(),
                    "url" => $document_url
                ]
            );

            \App\Models\Attandence_Permit::create(
                [
                    "student_id" => $req->student_id,
                    "attandence_permit_type_id" => $req->attandence_permit_type_id,
                    "document_id" => $document->id
                ]
            );

            return response()->json(
                [
                    "message" => "Success on create studnet attandence permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on create studnet attandence permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public function CreateAttandencePermitType(Request $req)
    {
        try {
            \App\Models\Attandence_Permit_Type::create(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_status
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
                    "message" => "Failed on create attandence permit type",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public function InsertIntoStudentAchievementMapping(Request $req)
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

    public function InsertIntoStudentViolationMapping(Request $req)
    {
        try {
            \App\Models\Mapping_Student_Violation::create(
                [
                    "violation_id" => $req->violation_id,
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

    public function InsertIntoStudentAttandencePermit(Request $req)
    {
        try {
            $file_path = Storage::url($req->file("file")->store("public/permit"));

            $document = \App\Models\Document::create(
                [
                    "name" => $req->file("file")->getName(),
                    "document_type" => $req->file("file")->getMimeType(),
                    "url" => $file_path
                ]
            );

            \App\Models\Attandence_Permit::create(
                [
                    "student_id" => $req->student_id,
                    "attandence_permit_type_id" => $req->attandence_permit_type_id,
                    "document_id" => $document->id
                ]
            );

            return response()->json(
                [
                    "message" => "Success on create attandence permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on create student attandence permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }
}
