import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'auto';

/**
 * GET http://localhost:3000/api?name=will&message=Hello
 */
export async function GET(request: NextRequest) {

    // header
    const headerList = await headers();
    const contentType = headerList.get("Content-Type")
    console.log("contentType:", contentType);

    // url, url params
    const url = request.nextUrl;
    const searchParams = url.searchParams
    const name = searchParams.get('name')
    const message = searchParams.get('message')

    // cookie
    const cookie = await cookies()
    const token = cookie.get("token")
    console.log("token:", token);

    const data = { name: name, message: message, time: new Date().toLocaleTimeString() };
    return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

/**
 * json 格式数据
 */
export async function POST(request: NextRequest) {
    // read request body
    const body = await request.json();
    if (!body.message) {
        return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    const newUser = { id: Date.now(), ...body };

    return NextResponse.json(newUser, {
        status: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}


// 用于更新全量信息
export async function PUT(request: NextRequest) {
    console.log("PUT: ", request.method);
}

// 用于获取资源的头部信息（比如查看资源是否存在等，不返回主体内容）。
export async function HEAD(request: NextRequest) {
    console.log("HEAD: ", request.method);
}

// 用于部分更新
export async function PATCH(request: NextRequest) {
    console.log("PATCH: ", request.method);
}

// 用于删除指定资源
export async function DELETE(request: NextRequest) {
    console.log("DELETE: ", request.method);
}

// 用于返回服务器针对特定资源所支持的 HTTP 方法等信息，常用于跨域等情况的预检请求。
export async function OPTIONS(request: NextRequest) {
    console.log("OPTIONS: ", request.method);
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Allow': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

