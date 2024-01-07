<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttandencePermits extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attandence_permits', function (Blueprint $table) {
            $table->id();
            $table->foreignId("student_id");
            $table->foreignId("attandence_permit_type_id");
            $table->foreignId("document_id")->nullable();
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
        Schema::dropIfExists('attandence_permits');
    }
}
