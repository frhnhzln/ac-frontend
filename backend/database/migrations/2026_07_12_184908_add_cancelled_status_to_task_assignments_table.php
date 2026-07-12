<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
            ALTER TABLE task_assignments
            MODIFY status ENUM(
                'assigned',
                'completed',
                'cancelled'
            ) NOT NULL DEFAULT 'assigned'
        ");
    }

    public function down(): void
    {
        // Convert cancelled records before removing that enum value.
        DB::table('task_assignments')
            ->where('status', 'cancelled')
            ->update(['status' => 'assigned']);

        DB::statement("
            ALTER TABLE task_assignments
            MODIFY status ENUM(
                'assigned',
                'completed'
            ) NOT NULL DEFAULT 'assigned'
        ");
    }
};