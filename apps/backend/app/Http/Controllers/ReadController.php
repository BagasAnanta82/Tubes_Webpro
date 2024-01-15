<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ReadController extends Controller
{
    public function authenticateUser(Request $req)
    {
        return \App\Services\AuthenticationServices::AuthUser($req);
    }

    public function getAllClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::GetAllClassroomData($req);
    }

    public function getAllAchivementData(Request $req)
    {
        return \App\Services\AchievementServices::GetAllAchievements($req);
    }

    public function getAllViolationData(Request $req)
    {
        try {
            $data = \App\Models\Violation::select(
                "name",
                "violation_code",
                "score",
                "active_status",
            )
             ->orederBy("created_at", "ASC")
             ->get();

            return response()->json(
                [
                    "message" => "Success on get violation",
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

    public function getAllGender(Request $req)
    {
        try {
            $data = \App\Models\Gender::select(
                "id",
                "gender",
                "code"
            )->get();

            return response()->json(
                [
                    "message" => "Success on get Gender",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get gender",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function getAllPermitType(Request $req)
    {
        try {
            $data = \App\Models\Attandence_Permit_Type::select(
                "id",
                "name"
            )
             ->where("active_status", true)
             ->get();

            return response()->json(
                [
                    "message" => "Success on get Gender",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get gender",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function getAllStudentData(Request $req)
    {
        try {
            $data = \App\Models\Student::select(
                "students.id as student_id",
                "students.name",
                "students.NIS",
                "students.NISN",
                "g.id as gender_id",
                "g.code",
                "c.id as classroom_id",
                "c.name as classroom_name"
            )
             ->leftJoin("genders as g", "g.id", "=", "students.gender_id")
             ->leftJoin("classrooms as c", "c.id", "=", "students.classroom_id")
             ->where("students.active_status", true)
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


    public function getAllAttadenceRecords(Request $req)
    {
        return \App\Services\AttandenceServices::GetAllStudentAttandeces($req);
    }

    public function GetStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::GetAllStudentPermitRecords($req);
    }

    public function GetAllStudentAchievementRecords(Request $req)
    {
        try {
            $data = \App\Models\Mapping_Student_Achievement::select(
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
                "mapping_student_achievements.description"
            )
             ->leftJoin("achievements as ach", "ach.id", "=", "mapping_student_achievements.achievement_id")
             ->leftJoin("students as s", "s.id", "=", "mapping_student_achievements.student_id")
             ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
             ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
             ->where("s.active_status", true)
             ->where("ach.active_status", true)
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

    public function GetAllStudentViolationRecords(Request $req)
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

    public function exportExcelStudentAttandence(Request $req)
    {
        $date_start = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateTime();
        $date_end = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateTime();

        return Excel::download(new \App\Exports\Excel\AttandenceExcel($date_start, $date_end), hash("sha256", Carbon::now()->toString()) . ".xlsx");
    }
}
