import { request } from "@/lib/api";

interface AdminLoginPayload {
    email: string;
    password: string;
}

export const loginAsAdmin = async (payload: AdminLoginPayload) => {
    return request(`/admin/login`, "POST", payload);
};

export const logoutAdmin = async () => {
    return request(`/admin/logout`, "GET");
};
