import { Organization } from "@/app/types/organization.type";
import { request } from "@/lib/api";
import { withAuth } from "@/lib/server/requireAuth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    const { id } = await params;
    const payload = await req.json();

    return withAuth(async ({ headers }) => {
        const updated = await request<Organization>(
            `/admin/organization/${id}`,
            "PUT",
            headers,
            payload,
        );
        return NextResponse.json(updated, { status: 200 });
    });
};

export const DELETE = async (
    _: NextRequest,
    { params }: { params: { id?: string } },
) => {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Organization id is required" },
            { status: 400 },
        );
    }

    return withAuth(async ({ headers }) => {
        const response = await request(
            `/admin/organization/${id}`,
            "DELETE",
            headers,
        );

        return NextResponse.json(response, { status: 200 });
    });
};
