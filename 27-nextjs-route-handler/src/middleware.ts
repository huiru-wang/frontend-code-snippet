import { NextRequest, NextResponse } from 'next/server';

// 全局中间件示例，用于记录请求日志
export function middleware(request: NextRequest) {
    console.log('🤑', request.nextUrl.pathname);

    // 继续执行
    const response = NextResponse.next();

    response.headers.set('x-middleware-global', 'true');
    return response
}

// 当前中间间的匹配范围
export const config = {
    matcher: ['/api/:path*']
}

