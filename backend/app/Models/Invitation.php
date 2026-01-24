<?php

namespace App\Models;

use App\Enums\InvitationStatus;
use App\Observers\InvitationObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy([InvitationObserver::class])]
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

    public function scopeForOrganization(Builder $builder, $organizationId): Builder 
    {
        return $builder->where('organization_id', $organizationId);
    }

    public function scopeForUser(Builder $builder, $userId): Builder
    {
        return $builder->where('user_id', $userId);
    }

    public function scopeNotExpired(Builder $builder): Builder 
    {
        return $builder->where('expires_at', '>', now());
    }

    public function scopeIsPending(Builder $builder): Builder 
    {
        return $builder->whereNull('accepted_at')
                        ->where('status', InvitationStatus::PENDING);
    }

    public static function findActiveInvitation($organizationId, $userId): ?static 
    {
        return static::forOrganization($organizationId)
                       ->forUser($userId)
                       ->notExpired()
                       ->first();
    }
    
}
