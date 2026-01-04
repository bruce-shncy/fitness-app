export interface Organization {
    id: number;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
};


export type OrganizationPayload = {
    name: string;
    address: string;
};

export type ApiOrganizationListResponse<T> = {
    data: T;
};
