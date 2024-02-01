<?php

namespace App\Services;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Exception;

class StudentViolationServices
{
    public static function getAllStudentViolationRecords(Request $req)
    {
        try {
            $data = \App\Models\Mapping_Student_Violation::select(
                "vln.name as violation_name",
                "vln.violation_code as violation_code",
                "vln.score as violation_score",
                "s.id as student_id",
                "s.name as student_name",
                "s.NIS",
                "s.NISN",
                "g.id as gender_id",
                "g.code",
                "c.id as classroom_id",
                "c.name as classroom_name",
                "mapping_student_violations.description"
            )
                ->leftJoin("violations as vln", "vln.id", "=", "mapping_student_violations.achievement_id")
                ->leftJoin("students as s", "s.id", "=", "mapping_student_violations.student_id")
                ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
                ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
                ->where("s.active_status", true)
                ->where("vln.active_status", true)
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
                    "message" => "failed to get violation records",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function getStudentViolationRecordsById(string $id)
    {
        try {
            if (is_null($id)) {
                throw new Exception("No Id Sent", 1);
            }
            $score = 0;
            $data = \App\Models\Mapping_Student_Violation::select(
                "vln.name as violation_name",
                "vln.violation_code as violation_code",
                "vln.score as violation_score",
                "mapping_student_violations.id",
                "mapping_student_violations.description",
                "mapping_student_violations.student_id",
                "mapping_student_violations.created_at as timestamp"
            )
                ->leftJoin("violations as vln", "vln.id", "=", "mapping_student_violations.violation_id")
                ->leftJoin("students as s", "s.id", "=", "mapping_student_violations.student_id")
                ->where("mapping_student_violations.student_id", $id)
                ->where("s.active_status", true)
                ->where("s.deleted_at", null)
                ->where("vln.active_status", true)
                ->where("vln.deleted_at", null)
                ->groupBy(["mapping_student_violations.id", "vln.id", "vln.name", "vln.violation_code", "vln.score", "mapping_student_violations.description", "mapping_student_violations.student_id", "mapping_student_violations.created_at"])
                ->get()
                ->toArray();

            foreach ($data as $key => $value) {
                $score += $value["violation_score"];
            }

            return response()->json(
                [
                    "message" => "success to get violation records",
                    "status" => true,
                    "data" => [
                        "student" => $data,
                        "total_score" => $score
                    ]
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get violation records",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function createStudentViolationRecords(Request $req)
    {
        try {
            foreach ($req->students as $key => $value) {
                \App\Models\Mapping_Student_Violation::create(
                    [
                        "violation_id" => $req->violation_id,
                        "student_id" => $value["student_id"],
                        "description" => $req->description
                    ]
                );
            }

            return response()->json(
                [
                    "message" => "Success on create student violation records",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on create student violation records",
                    "status" => false,
                    "error" => $th->getMessage()
                ],
                500
            );
        }
    }

    public static function deleteStudentViolationRecords(Request $req)
    {
        try {
            \App\Models\Mapping_Student_Violation::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "success to delete student violation records",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "messsage" => "failed to delete student violation records",
                    "status" => false,
                    "error" => $th->getMessage()
                ],
                500
            );
        }
    }

    public static function exportStudentViolationExcel(Request $req)
    {
        return Excel::download(new \App\Exports\StudentViolationExcel, hash("sha256", \Carbon\Carbon::now()->toString()) . ".xlsx");   
    }
}
