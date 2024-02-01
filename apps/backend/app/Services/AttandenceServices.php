<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Exception;


class AttandenceServices
{    
    public static function GetAllStudentAttandeces(Request $req)
    {
        try {
            $filter = DB::raw("1");

            if (is_null($req->classroom_id)) {
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

    public static function exportStudentAttandence(Request $req)
    {
        $date_start = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateTime();
        $date_end = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateTime();

        return Excel::download(new \App\Exports\Excel\AttandenceExcel($date_start, $date_end), hash("sha256", Carbon::now()->toString()) . ".xlsx");
    }
}