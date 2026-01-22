import { ApiInvitationListResponse, Invitation, InvitationPayload } from "@/app/types/invitation.type";
import { request } from "@/lib/api";
import { withAuth } from "@/lib/server/requireAuth";
import { NextResponse } from "next/server";

export const GET = async () => {
    return withAuth(async ({ headers }) => {
        const data = await request<ApiInvitationListResponse<Invitation[]>>(
            '/admin/invitation',
            "GET",
            headers
        );
        return NextResponse.json(data);
    });
};

export const POST = async (req: Request) => {
    const payload = await req.json() as InvitationPayload;

    return withAuth(async ({ headers }) => {
        try {
            const created = await request<Invitation>(
                "/admin/invitation",
                "POST",
                headers,
                payload
            );
            return NextResponse.json(created, { status: 201 });
        } catch (err: unknown) {
            const error = err as { status?: number; details?: object };
            const status = error?.status ?? 500;
            const details = error?.details ?? { message: "Request failed" };
            return NextResponse.json(details, { status });
        }
    });
};
