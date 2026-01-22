export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'REVOKED';

export interface Invitation {
    id: number;
    organization_id: number | null;
    user_id: number | null;
    role: string;
    invited_by_user_id: number | null;
    token: string;
    status: InvitationStatus;
    invited_at: string;
    expires_at: string | null;
    accepted_at: string | null;
    declined_at: string | null;
    revoked_at: string | null;
    invite_url: string;
    created_at: string;
    updated_at: string;
    // Loaded relations
    organization?: {
        id: number;
        name: string;
    };
    user_invited?: {
        id: number;
        name: string;
        email: string;
    };
}

export type InvitationPayload = {
    email: string;
    name: string;
    organization_id?: number | null;
};

export type ApiInvitationListResponse<T> = {
    data: T;
};
