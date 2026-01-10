import { Organization } from "@/app/types/organization.type";
import { request } from "@/lib/api";
import { withAuth } from "@/lib/server/requireAuth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {

    const { id } = await params
    const payload = await req.json();

    return withAuth(async ({ headers }) => {
        try {
            const updated = await request<Organization>(
                `/admin/organization/${id}`,
                "PUT",
                headers,
                payload
            );
            return NextResponse.json(updated, { status: 200 });
        } catch (err: any) {
            const status = err?.status ?? 500;
            const details = err?.details ?? { message: "Request failed" };
            return NextResponse.json(details, { status });
        }
    });
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id?: string } }
) => {
    const organizationId = params?.id ?? req.nextUrl.pathname.split("/").pop();

    if (!organizationId) {
        return NextResponse.json(
            { message: "Organization id is required" },
            { status: 400 }
        );
    }

    return withAuth(async ({ headers }) => {
        try {
            await request(
                `/admin/organization/${organizationId}`,
                "DELETE",
                headers
            );
            return NextResponse.json(null, { status: 204 });
        } catch (err: any) {
            const status = err?.status ?? 500;
            const details = err?.details ?? { message: "Request failed" };
            return NextResponse.json(details, { status });
        }
    });
};
