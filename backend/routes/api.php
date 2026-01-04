<?php

use App\Http\Controllers\Admin\OrganizationController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\InvitationController;
use App\Mail\CoachInviteOrganization;
use App\Models\Invitation;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;
use Illuminate\Http\Request;

Route::post('/admin/login', [AuthenticationController::class, "loginAsAdmin"])->name('admin.login');
Route::get('/admin/logout', [AuthenticationController::class, 'logout'])->name('admin.logout');


Route::prefix('admin')
    ->middleware(['auth:sanctum', 'role:ADMIN'])
    ->as('admin.')
    ->group(function () {
        Route::apiResource('organization', OrganizationController::class);
        Route::apiResource('/invitation', InvitationController::class);
});

Route::middleware('auth:sanctum')->get('/get', function (Request $request) {
    return $request->user();
});

Route::prefix('mail-preview')
    ->as('mail.preview.')
    ->group(function () {
        Route::get('/coach/invitation', function () {
            $user = User::factory()->create();
            $organization = Organization::factory()->create();
            
            $invitation = Invitation::create([
                'organization_id' => $organization? $organization->id : null,
                'user_id' => $user->id,
                'role' => Role::COACH,
                'token' => Str::random(64),
                'expires_at' => now()->addDays(3),
                'invited_at' => now()
            ]);

            return new CoachInviteOrganization($invitation);
        });
    });