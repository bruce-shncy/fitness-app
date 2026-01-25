import { ApiInvitationListResponse, Invitation } from "@/app/types/invitation.type";
import useSWR from "swr";

const key = "/api/auth/admin/invitations" as const;

export type ApiError = Error & { status?: number };

const fetcher = async (url: typeof key): Promise<ApiInvitationListResponse<Invitation[]>> => {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const err = new Error("Failed to load invitations") as ApiError;
        err.status = response.status;
        throw err;
    }

    return response.json();
};

const useInvitation = () => {
    const { data, error, isLoading, mutate } = useSWR<
        ApiInvitationListResponse<Invitation[]>,
        ApiError,
        typeof key
    >(key, fetcher, {
        shouldRetryOnError: false,
    });

    return {
        invitations: data?.data ?? [],
        error,
        isLoading,
        mutate
    };
};

export default useInvitation;
