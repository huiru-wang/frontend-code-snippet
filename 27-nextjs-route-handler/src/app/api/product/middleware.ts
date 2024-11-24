import { NextResponse } from 'next/server';

// 全局中间件示例，用于记录请求日志
export function middleware(request: Request) {
    console.log(`Product Middleware Received a request to ${request.url}`);
    return NextResponse.next();
}

// 当前中间间的匹配范围
export const config = {
    matcher: ['/api/product/*']
}

