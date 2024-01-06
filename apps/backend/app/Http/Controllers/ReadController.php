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

    function getAllAttadenceRecords(Request $req)
    {
        try {
            $filter = DB::raw("1");

            if ($req->classroom_id) {
                $classroom_id = ["s.classroom_id", "=", $req->classroom_id];
            }else{
                $classroom_id = [$filter, "=", $filter];
            }

            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateString();

            // dd($date_at);

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

    public function exportExcelStudentAttandence(Request $req)
    {
        return Excel::download(new \App\Exports\Excel\AttandenceExcel, hash("sha256", Carbon::now()->toString()) . ".xlsx");
    }
}
