# 36-nextjs-hono-rpc

## 1. 项目结构

```shell
src/
  |--app/
  |    |-- api/
  |        |-- [[...route]]
  |                |-- route.ts
  |--lib/
  |    |-- hono-client.ts
  |--server/
  |    |-- main.ts
  |    |-- posts.ts
```

## 2. hono server

创建`server/main.ts`，并创建Server实例
```ts
// main.ts
import { Hono } from 'hono'

// 保持和nextjs的api路径一致
const app = new Hono().basePath("api")

export default app
```

创建`server/posts.ts`实现posts相关的RestAPI：
```ts
import { Hono } from "hono";

const app = new Hono()
    .get("/:id", async (c) => {
        const data = `Get Post ${c.req.param("id")}`;
        return c.json({ sucess: true, data: data });
    })
    .post("", async (c) => {
        const request = await c.req.json();
        return c.json({ sucess: true, data: request });
    })
    .patch("/:id", async (c) => {
        const id = c.req.param("id");
        const request = await c.req.json();
        return c.json({ sucess: true, data: { id, request } });
    })
    .delete("/:id", async (c) => {
        const data = `Delete Post ${c.req.param("id")}`;
        return c.json({ sucess: true, data: data });
    });

export default app;
```

在`server/main.ts`中引入`server/posts.ts`

```ts
import { Hono } from 'hono';
import { cors } from "hono/cors";
import posts from './posts';

const app = new Hono().basePath("api")

app.route('/posts', posts);

export default app
```

## 3. 在Nextjs中引入hono

Nextjs的所有路由的所有请求方法都通过hono进行代理

```ts
// src/app/api/[[...route]]/route.ts
import { handle } from 'hono/vercel';
import app from '@/server/main';

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
export const HEAD = handle(app);
```

启动项目，访问：
- [GET http://localhost:3000/api/posts/1](http://localhost:3000/api/posts/1)
- [POST http://localhost:3000/api/posts](http://localhost:3000/api/posts)
- [PATCH http://localhost:3000/api/posts](http://localhost:3000/api/posts)
- [DELETE http://localhost:3000/api/posts/1](http://localhost:3000/api/posts/1)

## 4. 使用hono client

在`nextjs`中以RPC的方式访问后端服务，导出`AppType`作为RPC Stub：
```ts
import { Hono } from 'hono';
import { cors } from "hono/cors";
import posts from './posts';

const app = new Hono().basePath("api")

app.route('/posts', posts);

export default app
export type AppType = typeof app
```

创建`lib/hono-client.ts`，并导出`client`：

```ts
import { hc } from "hono/client";
import { AppType } from "@/server/main";

const client = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000');

// export const client;
export const postsAPI = client.api.posts;
```

这里的`process.env.NEXT_PUBLIC_API_BASE_URL`通过`@next/env`从`.env`加载：
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
```

配置`@next/env`，创建`envConfig.ts`：
```ts
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
```

在`src/app/blog/[slug]/page.tsx`中使用hono-client，访问后端服务

```tsx
import { client } from "@/lib/hono-client";

export default async function Home() {

  const response = await postsAPI.$get();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const book = await response.json();

  return (
    <div>
      <h1>Get books from hono: {book}</h1>
    </div>
  );
}
```

