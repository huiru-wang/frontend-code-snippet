import { NextRequest, NextResponse } from 'next/server';

/**
 * GET http://localhost:3000/api?name=will&message=Hello
 */
export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    console.log('request.nextUrl', url);
    const searchParams = url.searchParams
    const name = searchParams.get('name')
    const message = searchParams.get('message')

    const data = { name: name, message: message, time: new Date() };

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