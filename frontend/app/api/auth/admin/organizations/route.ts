import { ApiOrganizationListResponse, Organization } from "@/app/types/organization.type";
import { request } from "@/lib/api";
import { ACCESS_TOKEN_KEY } from "@/lib/config";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET  = async () => {
    const cookie = await cookies();

    const token = cookie.get(ACCESS_TOKEN_KEY);

    if (!token) {
          return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const headers: Record<string, string> = {
        Authorization: `Bearer ${token?.value}`
    }

    const data = await request<ApiOrganizationListResponse<Organization[]>>(
        '/admin/organization', 
        "GET", 
        headers
    );

    return NextResponse.json(data)
}