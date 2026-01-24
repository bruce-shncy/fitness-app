<?php 

namespace App\Services;

use App\Http\Requests\InvitationRequest;
use App\Jobs\SendInvitation;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class InvitationServices
{
    protected ?InvitationRequest $request = null;
    protected ?Invitation $invitation = null;

    public static function make(): static 
    {
        return new static();
    }

    public function with(InvitationRequest $request): static
    {
        $this->request = $request;

        return $this;
    }

    protected function createUser(): User
    {
        return User::firstOrCreate(
            ['email' => $this->request->email],
            ['name' => $this->request->name, 'password' => '']
        );
    }

    public function createInvitation(): static
    {
        $this->invitation = DB::transaction(function () {
            // Create user
            $user = $this->createUser();

            $organizationId = $this->request->input('organization_id');

            $existingInvitation = Invitation::findActiveInvitation($organizationId, $user->id);

            if ($existingInvitation) {
                return $existingInvitation;
            }

            $invitation = Invitation::create([
                    'organization_id' => $organizationId,
                    'user_id' => $user->id,
                    'role' => Role::COACH,
                    'token' => Str::random(64),
                    'expires_at' => now()->addDays(3),
                    'invited_at' => now()
            ]);

            return $invitation;
        }); 

        return $this;
    }
}