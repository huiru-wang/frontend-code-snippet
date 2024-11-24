# 27-nextjs-route-handler

官方：https://nextjs.org/docs/app/building-your-application/routing/route-handlers

Next.js 的路由处理器（Route Handler）是一种用于定义服务器端路由行为的功能。它允许你在 Next.js 应用中创建自定义的服务器端 API 端点，处理 HTTP 请求并返回响应，用于构建全栈应用的API接口；

通常服务端接口放在`/app/api`目录下，但不强制，可以是任何目录下的`route.ts`文件；

同一个路由段下，不可同时出现`page`和`route`文件，否则：
```
Error: ./src/app
An issue occurred while preparing your Next.js app
Conflicting route and page at /api: route at /api/route and page at /api/page
```

项目结构如下：
```shell
app/
  |-- api/
  |    |-- route.ts
  |    |-- product/
  |    |      |-- route.ts
  |    |-- chat/
  |    |      |-- route.ts
  |    |-- form/
  |           |-- route.ts
```

## HTTP Handler

- GET
- POST
- HEAD
- PUT
- DELETE

```ts
/**
 * GET http://localhost:3000/api?name=will&message=Hello
 */
export async function GET(request: NextRequest) {

    // url, url params
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
        },
    });
}

/**
 * 提交数据
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
            'Content-Type': 'application/json',
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
```

### Url Query Params
```ts
export async function GET(request: NextRequest) {

    // url, url params
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
        },
    });
}
```


### header处理

```ts
export async function GET(request: NextRequest) {

    // Nextjs api
    const headerList = await headers();
    const contentType = headerList.get("Content-Type")
    console.log(contentType);

    // Web APIs
    const requestHeaders = new Headers(request.headers)

    const data = { name: name, message: message, time: new Date() };
    return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```

### Cookie
```ts
export async function GET(request: NextRequest) {

    // Nextjs api
    const cookie = await cookies()
    const token = cookie.get("token")
    console.log(token);

    // Web APIs
    const token = request.cookies.get('token')

    const data = { name: name, message: message, time: new Date() };
    return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```

### Form表单数据处理

```ts
// /app/form/route.ts
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
```

## 缓存处理

GET方法在打包部署生产时，Nextjs可能会对GET请求进行缓存，一般判定为返回结果在编译期已确定，不会再变化时，会判定为静态资源。

退出缓存的方式：
1. GET方法内使用到`Request`对象；
2. 使用其他HTTP方法；
3. GET方法内使用到`Cookie` `Headers`等动态函数；
4. 手动指明此路由为动态：`export const dynamic = 'auto';`

```ts
// app/api/route.ts

// 手动指明此路由为动态
export const dynamic = 'auto';

export async function GET(request: NextRequest) {

    // header
    const headerList = await headers();

    // url, url params
    const url = request.nextUrl;

    // cookie
    const cookie = await cookies()

    return new NextResponse("hi", {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```


## CORS
```ts
export async function GET(request: NextRequest) {

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
```



## 动态API路由
```shell
app/
  |-- api/
  |    |-- product/
  |    |      |-- [id]/
  |    |      |     |-- route.ts
  |    |      |-- route.ts
```

接受一个对应参数类型的`Promise`
```ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    const data = { id: id, time: new Date() };
    return NextResponse.json(data);
}
```


## 中间件集成

拦截和处理请求；

使用场景：
- 身份验证：登录拦截
- 日志
- 缓存
- 速率限制 RateLimiter

全局中间件：`/src/middleware.ts`

函数名必须是：`middleware`
```ts
import { NextResponse } from 'next/server';

// 全局中间件示例，用于记录请求日志
export function middleware(request: Request) {
    console.log(`Global Middleware Received a request to ${request.url}`);

    // 继续执行
    const response = NextResponse.next();

    response.headers.set('x-middleware-global', 'true');
    return response
}

// 当前中间间的匹配范围
export const config = {
    matcher: ['/api/chat/:path*', '/api/form/:path*']
}
```

## 错误处理

1. handler内部处理错误
```ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = 1 / 0; 
        return NextResponse.json({ result });
    } catch (error) {
        console.error('同步错误:', error);
        return NextResponse.json({ message: '内部服务器错误（同步）' }, { status: 500 });
    }
}
```

2. 全局错误处理：`error.tsx`


