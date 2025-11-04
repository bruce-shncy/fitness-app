<?php

use App\Http\Controllers\Admin\OrganizationController;
use App\Http\Controllers\AuthenticationController;
use App\Mail\CoachInviteOrganization;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;

Route::post('/admin/login', [AuthenticationController::class, "loginAsAdmin"])->name('admin.login');
Route::get('/admin/logout', [AuthenticationController::class, 'logout'])->name('admin.logout');


Route::prefix('admin')
    ->middleware(['auth:sanctum', 'role:ADMIN'])
    ->as('admin.')
    ->group(function () {
        Route::apiResource('organization', OrganizationController::class);
});

Route::prefix('mail-preview')
    ->as('mail.preview.')
    ->group(function () {
        Route::get('/coach/invitation', function () {
            $user = User::factory()->create();
            $organization = Organization::factory()->create();
            $invitationUrl = 'test';
            $expiresAt = Carbon::now()->addHours(72);
            return new CoachInviteOrganization($user, $organization, $invitationUrl, $expiresAt);
        });
    });