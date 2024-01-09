<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mapping_Student_Achievement extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "mapping_student_achievements";
    protected $fillable = [
        "achievement_id",
        "student_id",
        "description"
    ];
}
