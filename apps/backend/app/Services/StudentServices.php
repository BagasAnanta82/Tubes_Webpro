<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;


class StudentServices{
    public static function getAllStudentData(Request $req)
    {
        try {
            $data = \App\Models\Student::select(
                "students.id as student_id",
                "students.name",
                "students.NIS",
                "students.NISN",
                "students.active_status",
                "g.id as gender_id",
                "g.code",
                "c.id as classroom_id",
                "c.name as classroom_name"
            )
             ->leftJoin("genders as g", "g.id", "=", "students.gender_id")
             ->leftJoin("classrooms as c", "c.id", "=", "students.classroom_id")
             ->orderBy("students.updated_at", "DESC")
             ->get();

            return response()->json(
                [
                    "message" => "Success on get data",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get student data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function deleteStudent(Request $req)
    {
        try {
            \App\Models\Student::where("students.id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "success delete student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed delete student",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function deleteMultipleStudent(Request $req)
    {
        try {
            DB::beginTransaction();

            foreach ($req->json as $key => $value) {
                \App\Models\Student::where("id", $value['student_id'])->delete();
            }

            DB::commit();
            return response()->json(
                [
                    "message" => "success delete student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json(
                [
                    "message" => "failed delete student",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function createStudent(Request $req)
    {
        try {
            \App\Models\Student::create(
                [
                    "NIS" => $req->NIS,
                    "NISN" => $req->NISN,
                    "Name" => $req->Name,
                    "gender_id" => $req->gender_id,
                    "classroom_id" => $req->classroom_id,
                    "active_status" => $req->active_status
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

    public static function updateStudent(Request $req)
    {
        try {
            \App\Models\Student::where("id", $req->id)->update(
                [
                    "NIS" => $req->NIS,
                    "NISN" => $req->NISN,
                    "Name" => $req->Name,
                    "gender_id" => $req->gender_id,
                    "classroom_id" => $req->classroom_id,
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
}