# 35-nextjs-hono

## 1. 项目创建

创建Next.js
```shell
pnpm dlx create-next-app@latest --ts --tailwind --eslint --app --src-dir --use-pnpm --import-alias "@/*"
```

引入hono
```shell
pnpm add hono
```

## 2. 配置route handler

将Next.js所有route handler 由hono代理

创建目录：
```shell
app/
  |-- api/
       |-- [[...route]]
                |-- route.ts
```

```ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

// 将Next.js的所有route handler 由Hono处理
const app = new Hono().basePath('/api')

app
    .get('/', (c) => {
        return c.json({
            message: 'Hello Next.js and Vercel!',
        })
    })
    .get('/:id', (c) => {
        const id = c.req.param('id');
        return c.text(`Hello ${id}!`)
    })
    .post('/create', (c) => {
        return c.text('POST')
    })

// 暴露GET、POST
export const GET = handle(app)
export const POST = handle(app)
```

启动项目，并访问：http://localhost:3000/api

## 3. 运行时

`export const runtime = 'edge'`是指定运行环境为：`Edge Function`，时Vercel的无服务器函数；


## 3. 引入zod

```shell
pnpm add zod @hono/zod-validator
```

```ts
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

// ...

app.get('/post/:id', zValidator("param", z.object({ id: z.coerce.number() })), (c) => {
        const id = c.req.param('id');
        return c.text(`Hello Post ${id}!`)
    })

// ...
```

访问：http://localhost:3000/api/post/1，正常；
访问：http://localhost:3000/api/post/a，报错:
```json
{
    "success": false,
    "error": {
        "issues": [
            {
                "code": "invalid_type",
                "expected": "number",
                "received": "nan",
                "path": [
                    "id"
                ],
                "message": "Expected number, received nan"
            }
        ],
        "name": "ZodError"
    }
}
```



