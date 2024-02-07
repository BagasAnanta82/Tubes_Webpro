<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAttandencePermitTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attandence_permit_types', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->boolean("active_status");
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table("attandence_permit_types")->insert(
            [
                "name" => "Sakit",
                "active_status" => true,
                "created_at" => now(),
                "updated_at" => now()
            ]
        );

        DB::table("attandence_permit_types")->insert(
            [
                "name" => "Izin",
                "active_status" => true,
                "created_at" => now(),
                "updated_at" => now()
            ]
        );

        DB::table("attandence_permit_types")->insert(
            [
                "name" => "Tidak Hadir",
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
        Schema::dropIfExists('attandence_permit_types');
    }
}
