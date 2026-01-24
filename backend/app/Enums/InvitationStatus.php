<?php 

namespace App\Enums;


enum InvitationStatus: string
{
    case PENDING = 'PENDING';
    case ACCEPTED = 'ACCEPTED';
    case DECLINED = 'DECLINED';
    case EXPIRED = 'EXPIRED';
    case REVOKED = 'REVOKED';
}