<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attandence_Time extends Model
{
    use HasFactory;
    protected $table = "attandece_time";
    protected $fillable = [
        "hours",
        "minutes"
    ];
}
