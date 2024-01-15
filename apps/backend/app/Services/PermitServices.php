<?php

namespace App\Services;

use Illuminate\Http\Request;
use DB;
use Exception;

class PermitServices
{
    public static function GetAllStudentPermitRecords(Request $req)
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
}