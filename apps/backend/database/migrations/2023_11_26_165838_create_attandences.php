<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttandences extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attandences', function (Blueprint $table) {
            $table->id();
            $table->foreignId("student_id");
            $table->foreignId("attandence_late_type_id");
            $table->timestamp("check_in_time")->nullable();
            $table->timestamp("check_out_time")->nullable();
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
        Schema::dropIfExists('attandences');
    }
}
