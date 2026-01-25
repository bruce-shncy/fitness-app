import {
    ApiOrganizationListResponse,
    Organization,
} from "@/app/types/organization.type";
import { request } from "@/lib/api";
import { withAuth } from "@/lib/server/requireAuth";
import { ApiError } from "@/services/swr/organization.swr";
import { NextResponse } from "next/server";

export type OrganizationFormType = {
    address: string;
    name: string;
};

export const GET = async () => {
    return withAuth(async ({ headers }) => {
        const data = await request<ApiOrganizationListResponse<Organization[]>>(
            "/admin/organization",
            "GET",
            headers,
        );
        return NextResponse.json(data);
    });
};

export const POST = async (req: Request) => {
    const payload = await req.json();

    return withAuth(async ({ headers }) => {
        const created = await request<Organization>(
            "/admin/organization",
            "POST",
            headers,
            payload,
        );

        return NextResponse.json(created, { status: 201 });
    });
};
