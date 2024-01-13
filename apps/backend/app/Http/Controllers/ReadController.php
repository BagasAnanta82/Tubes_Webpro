<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ReadController extends Controller
{
    public function authenticateUser(Request $req)
    {
        $validate = Validator::make($req->all(), [
            "email" => 'required',
            "password" => "required"
        ]);

        if ($validate->fails()) {
            return response()->json([
                "message" => "Failed to auth user",
                "status" => false,
                "error" => $validate->errors()
            ]);
        }

        try {
            $user = \App\Models\User::where("email", $req->email)->firstOrFail();

            if (!Hash::check($req->password, $user->password)) {
                throw new Exception("Gagal auth user", 1);
            }

            return response()->json(
                [
                    "message" => "Success to auth user",
                    "status" => true,
                    "data" => [
                        "email" => $user->email,
                        "token" => $user->createToken("auth-token")->plainTextToken
                    ]
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to auth user",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    function getAllClassroom(Request $req)
    {
        try {
            $data = \App\Models\Classroom::all();

            return response()->json(
                [
                    "message" => "success to get data",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to get data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function getAllAchivementData(Request $req)
    {
        try {
            $data = \App\Models\Achievements::select(
                "name",
                "description",
                "achievement_code",
                "score",
                "active_status",
            )
             ->orederBy("created_at", "ASC")
             ->get();

            return response()->json(
                [
                    "message" => "Success on get achievement",
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

    function getAllStudentData(Request $req)
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

    function getAllAttadenceRecords(Request $req)
    {
        try {
            $filter = DB::raw("1");

            if ($req->classroom_id) {
                $classroom_id = ["s.classroom_id", "=", $req->classroom_id];
            }else{
                $classroom_id = [$filter, "=", "1"];
            }

            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateString();

            $data = \App\Models\Attandence::select(
                "attandences.is_late",
                "s.name",
                "s.NIS",
                "s.NISN",
                "g.code",
                "attandences.created_at as timestamp"
            )
             ->leftJoin("students as s", "s.id", "=", "attandences.student_id")
             ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
             ->where([$classroom_id])
             ->where("s.active_status", true)
             ->whereDate("attandences.created_at", $date_at)
             ->orderBy("attandences.created_at", "DESC")
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
                    "message" => "failed to get attadance data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function GetStudentAttandencePermit(Request $req)
    {
        try {
            $start_time = microtime(true);

            if ($req->date_at) {
                $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime();
            }else{
                $date_at = \Carbon\Carbon::now()->toDateTime();
            }

            $data = \App\Models\Attandence_Permit::select(
                "s.id as student_id",
                "s.name as student_name",
                "s.NIS",
                "s.NISN",
                "g.id as gender_id",
                "g.code",
                "c.id as classroom_id",
                "c.name as classroom_name",
                "apt.name as permit_type_name",
                "d.id as document_id",
                "d.url as document_url"
            )
             ->leftJoin("students as s", "s.id", "=", "attandence_permits.student_id")
             ->leftJoin("attandence_permit_types as apt", "apt.id", "=", "attandence_permits.attandence_permit_type_id")
             ->leftJoin("documents as d", "d.id", "=", "attandence_permits.document_id")
             ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
             ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
             ->where("s.active_status", true)
             ->where("apt.active_status", true)
             ->whereDate("attandence_permits.created_at", $date_at)
             ->get();

            $end_time = microtime(true);
            $time = \number_format(($end_time - $start_time), 2);

            return response()->json(
                [
                    "message" => "success on get data",
                    "status" => true,
                    "response_time" => $time,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to get permit attadance data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
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
