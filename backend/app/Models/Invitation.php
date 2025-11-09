<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invitation extends Model
{
    protected $guarded = [];

    protected $appends = ['invite_url'];

    protected $casts = [
        'expires_at' => 'datetime',
        'invited_at' => 'datetime',
    ];


    public function userInvited(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization:: class, 'organization_id');
    }

    public function getInviteUrlAttribute(): string
    {
        return  rtrim(config('app.frontend_url'), '/') . '/invite/accept?token=' . urlencode($this->token);
    }
}
