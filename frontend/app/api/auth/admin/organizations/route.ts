import { ApiOrganizationListResponse, Organization } from "@/app/types/organization.type";
import { request } from "@/lib/api";
import { withAuth } from "@/lib/server/requireAuth";
import { NextResponse } from "next/server";

export type OrganizationFormType = {
    address: string
    name: string
}

export const GET  = async () => { 
   return withAuth(
        async ({ headers }) => {
            const data = await request<ApiOrganizationListResponse<Organization[]>>(
                '/admin/organization',
                "GET",
                headers
            )
            return NextResponse.json(data)
        }
    )
  
}

export const POST = async (req: Request) => {

    const payload = await req.json()
    console.log('payload >', payload)
    return withAuth(async ({ headers }) => {
        try {
            const created = await request<Organization>(
                "/admin/organization",
                "POST",
                headers,
                payload
            );

            return NextResponse.json(created, { status: 201 });
        } catch (err: any) {
            // preserve Laravel status + error body instead of turning into 500
            const status = err?.status ?? 500;
            const details = err?.details ?? { message: "Request failed" };
            return NextResponse.json(details, { status });
        }
  });
}