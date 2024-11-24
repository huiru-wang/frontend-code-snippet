# 36-nextjs-hono-rpc

## 1. 项目创建

沿用`35-nextjs-hono`的项目结构


## 2. RPC

RPC功能允许服务器和客户端之间共享API规范。


## 3. 调整项目结构并创建更多route

创建`src/server`
```shell
src/
  |--app/
  |    |-- api/
  |        |-- [[...route]]
  |                |-- route.ts
  |--server/
      |-- main.ts
      |-- books.ts
      |-- authors.ts

```

分离不同的route到其他文件：
```ts
// authors.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list authors'))
app.post('/', (c) => c.json('create an author', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```
```ts
// books.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list books'))
    .post('/', (c) => c.json('create a book', 201))
    .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```

挂载所有router，并暴露app、RPC规范
```ts
// main.ts
import { Hono } from 'hono'
import authors from './authors'
import books from './books'

// 保持和nextjs的api路径一致
const app = new Hono().basePath("api")

const routes = app.route('/authors', authors).route('/books', books)

export default app
export type AppType = typeof routes
```


## 4. 在Nextjs中引入hono

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


启动项目，访问：http://localhost:3000/api/books


## 5. 使用hono/client

使得Nextjs可以以RPC方式访问hono服务

创建`lib/hono-client.ts`

```shell
src/
  |--app/
  |    |-- api/
  |        |-- [[...route]]
  |                |-- route.ts
  |--lib/
      |-- hono-client.ts
  |--server/
      |-- main.ts
      |-- books.ts
      |-- authors.ts

```

```ts
import { AppType } from '@/server/main'
import { hc } from 'hono/client'

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
```

创建.env
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

在`src/app/page.tsx`中使用hono-client，访问后端服务

```tsx
import { client } from "@/lib/hono-client";

export default async function Home() {

  // 根据AppType，访问books相关RPC服务
  const response = await client.api.books.$get();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (
    <div>
      <h1>Get books from hono：{response.json()}</h1>
    </div>
  );
}
```

