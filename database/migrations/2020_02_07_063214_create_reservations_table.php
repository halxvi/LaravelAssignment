<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Reservations', function (Blueprint $table) {
            $table->bigincrements('id');
            $table->unsignedBigInteger('userid');
            $table->foreign('userid')->references('userid')->on('users');
            $table->unsignedBigInteger('facilityid');
            $table->foreign('facilityid')->references('facilityid')->on('facilities');
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Reservations');
    }
}
