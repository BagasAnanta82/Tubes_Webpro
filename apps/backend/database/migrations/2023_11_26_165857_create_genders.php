<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateGenders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('genders', function (Blueprint $table) {
            $table->id();
            $table->string("gender");
            $table->char("code");
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table("genders")->insert(
            [
                "gender" => "Laki-Laki",
                "code" => "L",
                "created_at" => now(),
                "updated_at" => now()
            ]
        );

        DB::table("genders")->insert(
            [
                "gender" => "Perempuan",
                "code" => "P",
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
        Schema::dropIfExists('genders');
    }
}
