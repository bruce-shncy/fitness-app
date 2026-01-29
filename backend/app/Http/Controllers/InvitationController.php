<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvitationRequest;
use App\Models\Invitation;
use App\Services\InvitationServices;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invitations = Invitation::with(['userInvited', 'organization'])
                        ->latest()
                        ->get();

        return response()->json([
            'data' => $invitations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        InvitationRequest $request,
        InvitationServices $invitationService
    )
    {
        try {
            // Process the invitation
            $invitationService->make()
                ->with($request)
                ->createInvitation();

            // Return success response with 201 Created status
            return response()->json([
                'message' => 'Invitation sent successfully',
                'data' => [
                    'email' => $request->email,
                    'expires_at' => now()->addDays(3)->toISOString()
                ]
            ], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            // Database errors (connection, constraint violations, etc.)
            return response()->json([
                'message' => 'Failed to create invitation due to database error',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);

        } catch (\Exception $e) {
            // Any other unexpected errors
            return response()->json([
                'message' => 'Failed to send invitation',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
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
