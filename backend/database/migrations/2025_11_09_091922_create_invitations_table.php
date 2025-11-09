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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')
                ->nullable()
                ->constrained('organizations')
                ->nullOnDelete();

            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->string('role');

            $table->foreignId('invited_by_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
    
            $table->string('token', 64)->unique();
            $table->timestamp('invited_at')->useCurrent();
            $table->timestamp('expires_at')->nullable();
            // Lifecycle
            $table->enum('status', ['PENDING','ACCEPTED','DECLINED','EXPIRED','REVOKED'])
                  ->default('PENDING')->index();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('declined_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
            // Optional audit
            $table->string('accepted_ip', 45)->nullable();
             // Prevent duplicate invites per user/role/org/status
            $table->unique(
                ['organization_id','user_id','role','status'],
                'uniq_invite_per_user_role_status'
            );
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
