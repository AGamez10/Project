<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('species'); // perro, gato, etc.
            $table->string('breed')->nullable();
            $table->integer('age');
            $table->enum('gender', ['macho', 'hembra']);
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->enum('size', ['pequeño', 'mediano', 'grande']);
            $table->enum('status', ['disponible', 'adoptado', 'en_proceso'])->default('disponible');
            $table->string('location');
            $table->boolean('vaccinated')->default(false);
            $table->boolean('sterilized')->default(false);
            $table->json('characteristics')->nullable(); // características especiales
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
