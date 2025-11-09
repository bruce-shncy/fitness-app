<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvitationRequest;
use App\Jobs\SendInvitation;
use App\Mail\CoachInviteOrganization;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InvitationRequest $request)
    {
      
        $invitation = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name, 
                'email' => $request->email
            ]);

            $invitation = Invitation::create([
                'organization_id' => $request->input('organization_id'),
                'user_id' => $user->id,
                'role' => Role::COACH,
                'token' => Str::random(64),
                'expires_at' => now()->addDays(3),
                'invited_at' => now()
            ]);

            return $invitation;
        });

        DB::afterCommit(function () use ($invitation) {
            SendInvitation::dispatch($invitation);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
