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
        Schema::create('task_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('team_id')
                ->constrained('team_tables')
                ->cascadeOnDelete();

            $table->integer('sequence')
                ->default(1);

            $table->decimal('distance',10,2)
                ->nullable();

            $table->enum('status',[
                'assigned',
                'completed'
            ])
            ->default('assigned');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_assignments');
    }
};
