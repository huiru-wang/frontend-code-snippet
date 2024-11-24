import { createUser, getUserById } from "@/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    const searchParam = request.nextUrl.searchParams;
    const id = Number(searchParam.get("id"))
    const user = await getUserById(id)
    return NextResponse.json({
        success: true,
        user,
    })
}

export const POST = async (request: NextRequest) => {

    const { name, email } = await request.json();
    const user = await createUser(name, email);
    return NextResponse.json({
        success: true,
        user,
    })
}