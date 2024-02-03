<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAttandeceTime extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attandece_time', function (Blueprint $table) {
            $table->id();
            $table->integer("hours");
            $table->integer("minutes");
            $table->timestamps();
        });

        DB::table("attandece_time")->insert(
            [
                "hours" => 6,
                "minutes" => 45,
                "created_at" => now(),
                "updated_at" => now()
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attandece_time');
    }
}
