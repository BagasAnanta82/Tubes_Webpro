<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Student extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "students";
    protected $fillable = [
        "NIS",
        "NISN",
        "Name",
        "gender_id",
        "classromm_id"
    ];
}
