<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
                ], 500
            );
        }
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
        try {
            \App\Models\Classroom::create(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_status
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to create classroom",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public function CreateAchievement(Request $req)
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
                    "achievement_id",
                    "student_id",
                    "description"
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
                    "violation_id",
                    "student_id",
                    "description"
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
}
