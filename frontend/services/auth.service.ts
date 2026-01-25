import { IUser } from "@/app/types/user.type";
import { request } from "@/lib/api";

interface AdminLoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    user: IUser
    accessToken: string
}

export const loginAsAdmin = async (payload: AdminLoginPayload): Promise<LoginResponse> => {
    return request(`/admin/login`, "POST", {}, payload);
};

export const logoutAdmin = async () => {
    return request(`/admin/logout`, "GET", {});
};
