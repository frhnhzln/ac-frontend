<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('teams', function (Blueprint $table) {

            $table->foreignId('team_table_id')
                  ->nullable()
                  ->constrained('team_tables')
                  ->nullOnDelete();

        });
    }

    public function down(): void
    {
        Schema::table('teams', function (Blueprint $table) {

            $table->dropForeign(['team_table_id']);
            $table->dropColumn('team_table_id');

        });
    }
};
