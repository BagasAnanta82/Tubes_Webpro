<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Achievements extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "achievements";
    protected $fillable = [
        "name",
        "description",
        "achievement_code",
        "score",
        "active_status",
    ];
}
