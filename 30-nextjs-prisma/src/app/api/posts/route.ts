import { getPostById, createPost } from "@/actions/posts"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const searchParam = request.nextUrl.searchParams;
    const id = Number(searchParam.get("id"))
    const post = await getPostById(id);
    return NextResponse.json({
        success: true,
        post,
    })
}

export const POST = async (request: NextRequest) => {

    const requestBody = await request.json();
    const post = await createPost(requestBody);

    return NextResponse.json({
        success: true,
        post,
    })
}