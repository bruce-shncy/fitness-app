import { OrganizationFormType } from "@/app/api/auth/admin/organizations/route";
import { Organization } from "@/app/types/organization.type";
import { clientApiFetch } from "@/lib/apiClient";

const ORGANIZATION_URL =  '/api/auth/admin/organizations'

export const organization = {
    
    create: (payload: OrganizationFormType) => clientApiFetch<Organization, OrganizationFormType>(
        ORGANIZATION_URL, {
          method: 'POST',
          body: payload
        }
    )
}