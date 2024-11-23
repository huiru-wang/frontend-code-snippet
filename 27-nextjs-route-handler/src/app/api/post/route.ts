import { NextResponse } from 'next/server';

/**
 * GET http://localhost:3000/api?name=will&message=Hello
 */
export async function GET() {

    const data = [
        { id: 1, title: "First" },
        { id: 2, title: "Second" },
        { id: 3, title: "Third" },
    ];
    return NextResponse.json(data);
}
