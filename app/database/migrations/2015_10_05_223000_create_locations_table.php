<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->string('udid');
            $table->string('address');
            $table->decimal('lat', 10, 8);
            $table->decimal('lon', 11, 8);
            $table->boolean('active')->default(true);
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
        Schema::drop('locations');
    }
}
