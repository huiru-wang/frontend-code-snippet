import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    const data = { id: id, time: new Date().toLocaleDateString() };
    return NextResponse.json(data);
}