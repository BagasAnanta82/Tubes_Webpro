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

    private static function reduceMappingInArray(array $arr)
    {
        $res = array();

        foreach($arr as $key => $value){
            array_push($res, $value["student_id"]);
        }

        return $res;
    }

    public static function generateStudentAttandenceNotTapping(Request $req)
    {
        try {
            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateString();

            $curr_permit = \App\Models\Attandence_Permit::select(
                "student_id"
            )
             ->whereDate("created_at", $date_at)
             ->get()
             ->toArray();

            if(count($curr_permit) != 0){
                return response()->json(
                    [
                        "message" => "success student has been generate for today",
                        "status" => true
                    ]
                );
            }

            $student = \App\Models\Student::select(
                "id as student_id",
            )
             ->where("active_status", true)
             ->get()
             ->toArray();
            
            $current_att = \App\Models\Attandence::select(
                "student_id"
            )
             ->whereDate("created_at", $date_at)
             ->get()
             ->toArray();
            
            $diff = array_diff(AttandenceServices::reduceMappingInArray($student), AttandenceServices::reduceMappingInArray($current_att));
            
            $insertData = [];

            foreach ($diff as $key => $value) {
                $insertData[] = [
                    "student_id" => $value,
                    "attandence_permit_type_id" => 3,
                    "document_id" => null,
                    "created_at" => $date_at,
                    "updated_at" => $date_at
                ];
            }
            \App\Models\Attandence_Permit::insert($insertData);
            
            return response()->json(
                [
                    "message" => "success to generate student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to genreate student not tapping",
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