<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class StudentAttandenceExcel implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $data = \App\Models\Mapping_Student_Achievement::select(
            "ach.name as achievement_name",
            "ach.achievement_code as achievement_code",
            "ach.score as achievement_score",
            "s.name as student_name",
            "s.NIS",
            "s.NISN",
            "g.code",
            "g.gender",
            "c.name as classroom_name",
            "mapping_student_achievements.description",
            "mapping_student_achievements.created_at as timestamp"
        )
         ->leftJoin("achievements as ach", "ach.id", "=", "mapping_student_achievements.achievement_id")
         ->leftJoin("students as s", "s.id", "=", "mapping_student_achievements.student_id")
         ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
         ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
         ->where("s.active_status", true)
         ->where("s.deleted_at", null)
         ->where("ach.active_status", true)
         ->where("ach.deleted_at", null)
         ->get();
        
        return $data;
    }

    public function headings(): array
    {
        return [
            "Nama Pencapaian",
            "Code Pencapaian",
            "Nilai Pencapaian",
            "Nama Siswa",
            "NIS Siswa",
            "NISN Siswa",
            "Kode Kelamin",
            "Kelamin",
            "Kelas Siswa",
            "Deskripsi",
            "Timestamp"
        ];
    }
}
