<?php

namespace App\Jobs;

use App\Models\Invitation;
use App\Models\Organization;
use App\Models\User;
use App\Notifications\SendInvitationNotification;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendInvitation implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Invitation $invitation,
    )
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::debug("Sending email to {$this->invitation->userInvited->name}");

        $this->invitation->userInvited->notify(
            new SendInvitationNotification($this->invitation)
        );

         Log::debug("Email sent successfully to {$this->invitation->userInvited->name}");
    }
}
