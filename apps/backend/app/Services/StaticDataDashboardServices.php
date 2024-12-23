<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Request;

class StaticDataDashboardServices{
    public static function getDataDashboardStatic(Request $req)
    {
        try {
            $student_achivement = \App\Models\Mapping_Student_Achievement::join("achievements as ach", "ach.id", "=", "mapping_student_achievements.achievement_id")
             ->where("ach.deleted_at", null)
             ->count();
   
           $student_violation = \App\Models\Mapping_Student_Violation::join("violations as vln", "vln.id", "=", "mapping_student_violations.violation_id")
             ->where("vln.deleted_at", null)
             ->count();
           
           $data = [
               "student_active" => \App\Models\Student::where("active_status", true)->count(),
               "student_gender_male" => \App\Models\Student::where("gender_id", 1)->count(),
               "student_gender_female" => \App\Models\Student::where("gender_id", 2)->count(),
               "student_nonactive" => \App\Models\Student::where("active_status", false)->count(),
               "attandence" => \App\Models\Attandence::select("student_id")->whereDate("created_at", \Carbon\Carbon::now())->groupBy("student_id")->get()->count(),
               "attandence_islate" => \App\Models\Attandence::select("student_id")->where("attandence_late_type_id", 2)->where("attandence_late_type_id", 3)->whereDate("created_at", \Carbon\Carbon::now())->groupBy("student_id")->get()->count(),
               "attandence_notlate" => \App\Models\Attandence::select("student_id")->where("attandence_late_type_id", 1)->whereDate("created_at", \Carbon\Carbon::now())->groupBy("student_id")->get()->count(),
               "achievement" => \App\Models\Achievements::count(),
               "violation" => \App\Models\Violation::count(),
               "student_achievement" => $student_achivement,
               "student_violation" => $student_violation
           ];

        
            return response()->json(
                [
                    "message" => "success on get data",
                    "status" => false,
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
}