import { NextRequest, NextResponse } from 'next/server';


/**
 * 表单数据获取
 */
export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    return NextResponse.json({ name, email })
}