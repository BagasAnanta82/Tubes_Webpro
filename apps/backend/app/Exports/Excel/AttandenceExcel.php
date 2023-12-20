<?php

namespace App\Exports\Excel;

use App\Models\Attandence;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;

class AttandenceExcel implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $data = Attandence::select(
            "s.NIS",
            "s.NISN",
            "s.name",
            "g.code as Gender",
            "c.name as kelas",
            DB::raw("CASE WHEN attandences.is_late = 1 THEN 'Terlambat' ELSE 'Tepat' END as status"),
            "attandences.created_at as timestamp"
        )
         ->join("students as s", "s.id", "=", "attandences.student_id")
         ->join("genders as g", "g.id", "=", "s.gender_id")
         ->join("classrooms as c", "c.id", "=", "s.classroom_id")
         ->where("s.active_status", true)
         ->get();

        return $data;
    }
}
