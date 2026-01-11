import { ApiOrganizationListResponse, Organization } from "@/app/types/organization.type";
import useSWR from "swr";

const key = "/api/auth/admin/organizations" as const;

export type ApiError = Error & { status?: number };

const fetcher = async (url: typeof key): Promise<ApiOrganizationListResponse<Organization[]>> => {
    const response = await fetch(url,  {method: 'GET'});

    if (!response.ok) {
        const err = new Error("Failed to load organizations") as ApiError;
        err.status = response.status;
        throw err;
    }

    return response.json();
}

const useOrganization = () => {
    const {data, error, isLoading, mutate} = useSWR<
        ApiOrganizationListResponse<Organization[]>,
        ApiError,
        typeof key
    >
    ('/api/auth/admin/organizations', fetcher)

    return {
        organizations: data?.data ?? [],
        error,
        isLoading,
        mutate
    };
};

export default useOrganization;
