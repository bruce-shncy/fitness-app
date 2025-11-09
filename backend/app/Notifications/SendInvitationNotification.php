<?php

namespace App\Notifications;

use App\Mail\CoachInviteOrganization;
use App\Models\Invitation;
use App\Models\Organization;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendInvitationNotification extends Notification
{
    use Queueable;
    use Dispatchable;
    /**
     * Create a new notification instance.
     */
    public function __construct(
      public Invitation $invitation
    )
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): CoachInviteOrganization
    {
        return new CoachInviteOrganization(
            invitation: $this->invitation
        );
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
