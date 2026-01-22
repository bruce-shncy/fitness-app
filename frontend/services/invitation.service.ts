import { Invitation, InvitationPayload } from "@/app/types/invitation.type";
import { clientApiFetch } from "@/lib/apiClient";

const INVITATION_URL = '/api/auth/admin/invitations';

export const invitation = {
    create: (payload: InvitationPayload) =>
        clientApiFetch<Invitation, InvitationPayload>(
            INVITATION_URL,
            {
                method: 'POST',
                body: payload
            }
        ),
};
