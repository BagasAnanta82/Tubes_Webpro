<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Exception;

class AttandenceServices
{
    public static function CreateStudentAttandenceTapping(Request $req)
    {
        try {
            $att_std = \App\Models\Attandence::select(
                "attandences.created_at",
                "s.name"
            )
             ->leftJoin("students as s", "s.id", "=", "attandences.student_id")
             ->whereDate("created_at", \Carbon\Carbon::now())
             ->where("s.NIS", $req->nis)
             ->first();
            
            if (!is_null($att_std)) {
                throw new Exception($att_std->name . ' Telah Melakukan Presensi Hari Ini Pada ' . $att_std->created_at);
            }

            $student = \App\Models\Student::select("NIS")->where("NIS", $req->nis)->where("active_status", true)->first();

            if (is_null($student)) {
                throw new Exception("Siswa Dengan NIS " . $req->nis . " Tidak Terdaftar Atau Sedang Tidak Aktif");
            }

            $time = \App\Models\Attandence_Time::where("id", 1)->first();

            $date = \Carbon\Carbon::createFromTime($time->hours, $time->minutes);
            $date_sent = \Carbon\Carbon::parse($req->date_sent);

            if ($date_sent->lt($date)) {
                \App\Models\Attandence::create(
                    [
                        "student_id" => $student->id,
                        "is_late" => false
                    ]
                );

                return response()->json(
                    [
                        "message" => $student->name . " Berhasil Melakukan Presensi",
                        "status" => true
                    ]
                );
            }else{
                \App\Models\Attandence::create(
                    [
                        "student_id" => $student->id,
                        "is_late" => true
                    ]
                );

                return response()->json(
                    [
                        "message" => $student->name . " Telah Melakukan Presensi",
                        "status" => true
                    ]
                );
            }

        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => $req->getMessage(),
                    "status" => false
                ]
            );
        }
    }

    public static function GetAllStudentAttandeces(Request $req)
    {
        try {
            $filter = DB::raw("1");

            if ($req->classroom_id == "null" || is_null($req->classroom_id)) {
                $classroom_id = [$filter , "=", "1"];
            }else{
                $classroom_id = ["s.classroom_id", "=", $req->classroom_id];
            }

            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateString();

            $data = \App\Models\Attandence::select(
                "attandences.is_late",
                "attandences.student_id",
                "s.name",
                "s.NIS",
                "s.NISN",
                "g.code",
                "c.name as classroom_name",
                "attandences.created_at as timestamp"
            )
             ->leftJoin("students as s", "s.id", "=", "attandences.student_id")
             ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
             ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
             ->where([$classroom_id])
             ->where("s.active_status", true)
             ->whereDate("attandences.created_at", $date_at)
             ->groupBy([
                "attandences.is_late",
                "attandences.student_id",
                "s.name",
                "s.NIS",
                "s.NISN",
                "g.code",
                "c.name",
                "attandences.created_at"
             ])
             ->distinct()
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
            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime();

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
             ->groupBy("student_id")
             ->distinct()
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