import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY } from "../config";

export type HeadersType = {
    headers: Record<string, string>;
};

export type AuthContext = {
    token: string;
} & HeadersType;

export const requiredAuth = async (): Promise<AuthContext | NextResponse> => {
    const cookie = await cookies();

    const token = cookie.get(ACCESS_TOKEN_KEY)?.value;

    if (!token) {
        return NextResponse.json({
            messsage: "Unauthenticated",
            status: 401,
        });
    }

    return {
        token,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const withAuth = async <T>(
    handler: (auth: AuthContext) => Promise<T>,
) => {
    try {
        const auth = await requiredAuth();

        if (auth instanceof NextResponse) {
            return auth;
        }

        return await handler(auth);
    } catch (err: unknown) {
        console.log("err", err);
        const error = err as { status?: number; details?: object };
        const status = error?.status ?? 500;
        const details = error?.details ?? { message: "Request failed" };
        return NextResponse.json(details, { status });
    }
};
