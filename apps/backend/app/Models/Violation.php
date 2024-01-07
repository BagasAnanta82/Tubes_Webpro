<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Violation extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "violations";
    protected $fillable = [
        "name",
        "violation_code",
        "score",
        "active_status",
    ];
}
