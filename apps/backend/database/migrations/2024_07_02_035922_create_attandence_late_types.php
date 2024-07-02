<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAttandenceLateTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attandence_late_types', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("description");
            $table->boolean("active_status");
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table("attandence_late_types")->insert(
            [
                "name" => "Tepat Waktu",
                "active_status" => true,
                "created_at" => now(),
                "updated_at" => now()
            ]
        );

        DB::table("attandence_late_types")->insert(
            [
                "name" => "Terlambat",
                "active_status" => true,
                "created_at" => now(),
                "updated_at" => now()
            ]
        );

        DB::table("attandence_late_types")->insert(
            [
                "name" => "Sangat Telambat",
                "active_status" => true,
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
        Schema::dropIfExists('attandence_late_types');
    }
}
