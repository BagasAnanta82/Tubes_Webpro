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
            } else {
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

    public static function GetStudentAttandenceByStudentId(Request $req)
    {
        try {
            $student = \App\Models\Student::select(
                "id",
                "name"
            )
                ->where("active_status", true)
                ->where("id", $req->id)
                ->first();

            if (is_null($student)) {
                return response()->json(
                    [
                        "message" => "Student Data Did Not Exist",
                        "status" => false,
                        "error" => "data siswa tidak ditemukan"
                    ]
                );
            }

            $data = \App\Models\Attandence::select(
                "attandences.is_late",
                "attandences.created_at as timestamp"
            )
                ->where("attandences.student_id", $student->id)
                ->groupBy([
                    "attandences.is_late",
                    "attandences.created_at"
                ])
                ->distinct()
                ->orderBy("attandences.created_at", "DESC")
                ->get();

            $permission = \App\Models\Attandence_Permit::select(
                "apt.name",
                "attandence_permits.description",
                "attandence_permits.created_at as timestamp"
            )
                ->leftJoin("attandence_permit_types as apt", "apt.id", "=", "attandence_permits.attandence_permit_type_id")
                ->where("apt.active_status", true)
                ->where("attandence_permits.student_id", $student->id)
                ->orderBy("attandence_permits.created_at", "DESC")
                ->get();

            return response()->json(
                [
                    "message" => "success on get data",
                    "status" => true,
                    "data" => [
                        "attandence" => $data,
                        "permission" => $permission
                    ]
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

    public static function GetAllStudentAttandeces(Request $req)
    {
        try {
            $filter = DB::raw("1");

            if ($req->classroom_id == "null" || is_null($req->classroom_id)) {
                $classroom_id = [$filter, "=", "1"];
            } else {
                $classroom_id = ["s.classroom_id", "=", $req->classroom_id];
            }

            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateString();

            $data = \App\Models\Attandence::select(
                "attandences.check_in_time",
                "attandences.check_out_time",
                "attandences.student_id",
                "s.name",
                "s.NIS",
                "s.NISN",
                "g.code",
                "c.name as classroom_name",
                "attandences.created_at as timestamp",
                "a.name as status"
            )
                ->leftJoin("students as s", "s.id", "=", "attandences.student_id")
                ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
                ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
                ->leftJoin("attandence_late_types as a", "a.id", "=", "attandences.attandence_late_type_id")
                ->where([$classroom_id])
                ->where("s.active_status", true)
                ->whereDate("attandences.created_at", $date_at)
                ->groupBy([
                    "attandences.check_in_time",
                    "attandences.check_out_time",
                    "attandences.student_id",
                    "s.name",
                    "s.NIS",
                    "s.NISN",
                    "g.code",
                    "c.name",
                    "attandences.created_at",
                    "a.name"
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

        foreach ($arr as $key => $value) {
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

            if (count($curr_permit) != 0) {
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

    public static function deleteStudentAttandence(Request $req)
    {
        try {
            \App\Models\Attandence::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "Success to delete student attandence",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete student",
                    "status" => false
                ],
                500
            );
        }
    }

    public static function exportStudentAttandence(Request $req)
    {
        $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime() ?? \Carbon\Carbon::now()->toDateTime();

        return Excel::download(new \App\Exports\Excel\AttandenceExcel($date_at), hash("sha256", Carbon::now()->toString()) . ".xlsx");
    }

    public static function checkStudentPresenceIn(Request $req) 
    {
        try {
            $date = \Carbon\Carbon::now("Asia/Jakarta");
            $std = \App\Models\Student::where("nis", $req->nis)->first();
            
            if (is_null($std)) {
                return response()->json(
                    [
                        "message" => "Siswa tidak ditemukan",
                        "status" => false
                    ]
                );
            }

            $att_std = \App\Models\Attandence::where('student_id', $std->id)
            ->whereDate('created_at', $date)
            ->first();

            if (!is_null($att_std)) {
                return response()->json(
                    [
                        "message" => "telah melakukan presensi masuk sebelumnya",
                        "status" => false,
                    ]
                );
            }

            $att_time_data_in = \App\Models\Attandence_Time::where("id", 1)->first();
            $att_time = \Carbon\Carbon::now("Asia/Jakarta");
            $att_time->hours($att_time_data_in->hours);
            $att_time->minutes($att_time_data_in->minutes);
            $att_time->seconds(0);

            $att_super_late = \Carbon\Carbon::now("Asia/Jakarta")
                ->hours($att_time_data_in->hours)
                ->minutes($att_time_data_in->minutes)
                ->seconds(0);
            
            $att_super_late->addMinute(30);

            // Super Late
            if ($date > $att_super_late) {
                \App\Models\Attandence::create(
                    [
                        "student_id" => $std->id,
                        "check_in_time" => now("Asia/Jakarta"),
                        "attandence_late_type_id" => 3 // Terlambat
                    ]
                );
                
                return response()->json(
                    [
                        "message" => "Sukses melakukan presensi masuk, Sangat Terlambat",
                        "status" => true,
                    ]
                );
            }

            if ($date > $att_time) {
                \App\Models\Attandence::create(
                    [
                        "student_id" => $std->id,
                        "check_in_time" => now("Asia/Jakarta"),
                        "attandence_late_type_id" => 2 // Terlambat
                    ]
                );
                
                return response()->json(
                    [
                        "message" => "Sukses melakukan presensi masuk, Terlambat",
                        "status" => true,
                    ]
                );   
            }

            \App\Models\Attandence::create(
                [
                    "student_id" => $std->id,
                    "check_in_time" => now("Asia/Jakarta"),
                    "attandence_late_type_id" => 1 // Tepat waktu
                ]
            );

            return response()->json(
                [
                    "message" => "Sukses melakukan presensi masuk, tepat waktu",
                    "status" => true,
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "gagal untuk melakukan presensi",
                    "status" => false,
                    "error" => $th->getMessage()
                ],
                500
            );
        }
    }

    public static function checkStudentPresenceOut(Request $req) 
    {
        try {
            $date = \Carbon\Carbon::now("Asia/Jakarta");
            $std = \App\Models\Student::where("nis", $req->nis)->first();
            
            if (is_null($std)) {
                return response()->json(
                    [
                        "message" => "Siswa tidak ditemukan",
                        "status" => false
                    ]
                );
            }

            $att_std = \App\Models\Attandence::where('student_id', $std->id)
                ->whereDate('created_at', $date) 
                ->whereNotNull('check_in_time')
                ->first();

            if (is_null($att_std)) {
                return response()->json(
                    [
                        "message" => "Anda belum melakukan presensi sebelumnya",
                        "status" => false,
                        "error" => "belum melakukan presensi masuk"
                    ]
                );
            }

            if (!is_null($att_std->check_out_time)) {
                return response()->json(
                    [
                        "message" => "Anda telah melakukan presensi sebelumnya",
                        "status" => false
                    ]
                );
            }

            $att_time_data = \App\Models\Attandence_Time::where("id", 2)->first();
            $att_time = \Carbon\Carbon::now("Asia/Jakarta")
                    ->hours($att_time_data->hours)
                    ->minutes($att_time_data->minutes)
                    ->seconds(0);

            if ($date < $att_time) {
                return response()->json(
                    [
                        "message" => "Mohon Maaf, saat ini belum waktu presensi, presensi dapat dilakukan pada pukul " . $att_time->toTimeString(),
                        "status" => false
                    ]
                );
            }

            $att_std->update(
                [
                'check_out_time' => now("Asia/Jakarta")
                ]
            );

            return response()->json(
                [
                    "message" => "Berhasil melakukan presensi keluar",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "gagal untuk melakukan presensi",
                    "status" => false,
                    "error" => $th->getMessage()
                ],
                500
            );
        }
    }

    public static function GetLatestStudentAttendances(Request $req)
    {
        try {
            $filter = DB::raw("1");

            if ($req->classroom_id == "null" || is_null($req->classroom_id)) {
                $classroom_id = [$filter, "=", "1"];
            } else {
                $classroom_id = ["s.classroom_id", "=", $req->classroom_id];
            }

            $date_at = \Carbon\Carbon::parse($req->date_at)->toDateString() ?? \Carbon\Carbon::now()->toDateString();

            $data = \App\Models\Attandence::select(
                "attandences.student_id",
                "attandences.check_in_time",
                "s.name",
                "s.NIS",
                "s.NISN",
                "g.code",
                "c.name as classroom_name"
            )
                ->leftJoin("students as s", "s.id", "=", "attandences.student_id")
                ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
                ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
                ->where([$classroom_id])
                ->where("s.active_status", true)
                ->whereDate("attandences.created_at", $date_at)
                ->groupBy([
                    "attandences.student_id",
                    "attandences.check_in_time",
                    "s.name",
                    "s.NIS",
                    "s.NISN",
                    "g.code",
                    "c.name"
                ])
                ->distinct()
                ->orderBy("attandences.check_in_time", "DESC")
                ->take(5)
                ->get();

            return response()->json(
                [
                    "message" => "Success on getting data",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get attendance data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}
