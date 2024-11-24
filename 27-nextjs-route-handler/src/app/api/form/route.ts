import { NextRequest, NextResponse } from 'next/server';


// static GET method
export async function GET() {
    return NextResponse.json({ message: "hi", time: new Date().toLocaleDateString() })
}

/**
 * 表单数据获取
 */
export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    return NextResponse.json({ name, email })
}