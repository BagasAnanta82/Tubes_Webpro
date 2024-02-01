<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class StudentViolationExcel implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $data = \App\Models\Mapping_Student_Violation::select(
            "vln.name as violation_name",
            "vln.violation_code as violation_code",
            "vln.score as violation_score",
            "s.name as student_name",
            "s.NIS",
            "s.NISN",
            "g.gender",
            "g.code",
            "c.name as classroom_name",
            DB::raw("CASE WHEN mapping_student_violations.description is null THEN '' ELSE mapping_student_violations.description END as description"),
            "mapping_student_violations.created_at as timestamp"
        )
            ->leftJoin("violations as vln", "vln.id", "=", "mapping_student_violations.achievement_id")
            ->leftJoin("students as s", "s.id", "=", "mapping_student_violations.student_id")
            ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
            ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
            ->where("s.active_status", true)
            ->where("s.deleted_at", null)
            ->where("vln.active_status", true)
            ->where("vln.deleted_at", null)
            ->get();

        return $data;
    }

    public function headings(): array
    {
        return [
            "Nama Pelanggaran",
            "Kode Pelanggaran",
            "Nilai Pelanggaran",
            "Nama Siswa",
            "NIS",
            "NISN",
            "Kelamin",
            "Kode Kelamin",
            "Kelas Siswa",
            "Deskripsi",
            "Timestamp"
        ];
    }
}
