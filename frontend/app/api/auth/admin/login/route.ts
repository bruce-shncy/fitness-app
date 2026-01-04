import { loginAsAdmin } from "@/services/auth.service"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const body = await request.json()

    const  { accessToken } = await loginAsAdmin(body)

    const response = NextResponse.json({success: true})

    response.cookies.set('fitness_app_token', accessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
    })

    return response;
}