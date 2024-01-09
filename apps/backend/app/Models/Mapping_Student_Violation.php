<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mapping_Student_Violation extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "mapping_student_violations";
    protected $fillable = [
        "student_id",
        "violation_id",
        "description"
    ];
}
