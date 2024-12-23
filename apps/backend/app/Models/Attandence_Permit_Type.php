<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attandence_Permit_Type extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "attandence_permit_types";
    protected $fillable = [
        "name",
        "active_status"
    ];

}
