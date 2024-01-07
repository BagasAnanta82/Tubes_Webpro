<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMappingStudentAchievements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mapping_student_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId("achievement_id");
            $table->foreignId("student_id");
            $table->string("description");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mapping_student_achievements');
    }
}
