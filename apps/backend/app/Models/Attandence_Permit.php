<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attandence_Permit extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "attandence_Permits";
    protected $fillable = [
        "student_id",
        "attandence_permit_type_id",
        "document_id",
    ];
}
