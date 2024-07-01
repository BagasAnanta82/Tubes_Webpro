<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attandence extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "attandences";
    protected $fillable = [
        "student_id",
        //"is_late",
        "check_in_time",
        "check_out_time",
        "attandence_late_type_id"
    ];
    protected $primaryKey = "id";
}
