@component('mail::message')
# Hi {{ $user->name  }}

You’ve been invited to join **{{ $organization->name }}** as a **Coach** on our fitness platform.

@component('mail::panel')
As part of the coaching team, you’ll be able to:
- Manage your clients and their progress
- Create and assign personalized workout & meal plans
- Review logs and communicate with clients
@endcomponent

@component('mail::button', ['url' => $inviteUrl])
Accept Invitation
@endcomponent

This invitation link {{ $expiresHuman ? "expires {$expiresHuman}" : 'expires in 72 hours' }}.

If you weren’t expecting this, you can safely ignore this email.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
