<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AttandenceLateType extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = "attandence_late_types";
    protected $fillable = [
        "name",
        "description",
        "active_status"
    ];
}