import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY } from "../config";

export type HeadersType = {
    headers: Record<string, string>
}

export type AuthContext = {
    token: string
} & HeadersType


export const requiredAuth = async (): Promise<AuthContext |NextResponse> => {
    const cookie = await cookies();

    const token = cookie.get(ACCESS_TOKEN_KEY)?.value

    if (!token) {
        return NextResponse.json({
            messsage: 'Unauthenticated',
            status: 401
        })
    }

    return {
        token,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const withAuth = async<T>(
    handler: (auth: AuthContext) => Promise<T>
) => {
    const auth = await requiredAuth();

    if (auth instanceof NextResponse) {
        return auth
    }

    return handler(auth)
}