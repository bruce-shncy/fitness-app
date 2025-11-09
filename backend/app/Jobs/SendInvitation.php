<?php

namespace App\Jobs;

use App\Models\Invitation;
use App\Models\Organization;
use App\Models\User;
use App\Notifications\SendInvitationNotification;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

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
        $this->invitation->user->notify(
            new SendInvitationNotification($this->invitation)
        );
    }
}
