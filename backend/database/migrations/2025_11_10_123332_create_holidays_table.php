<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('holidays', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('date')->unique();
            $table->string('type'); // e.g. Regular Holiday, Special Non-working Day
            $table->string('description')->nullable();
            $table->timestamps();
            $table->decimal('multiplier', 3, 1)->default(1.0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('holidays');
    }
};
