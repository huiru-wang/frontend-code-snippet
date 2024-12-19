
## MDX

### 1. Tailwind + MDX

引入依赖：
```shell
pnpm add @tailwindcss/typography
```

1. 引入插件：`@tailwindcss/typography`
2. 将`src/mdx-components.tsx`样式引入到`tailwind.config.js`中

```js
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/mdx-components.tsx'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} satisfies Config;
```


### 2. 自定义样式

针对MDX文件中的渲染后的特定HTML标签，添加自定义样式
```ts
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// Global Style and Components
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h1: ({ children }) => (
            <h1 className='text-3xl text-red-400'>{children}</h1>
        ),
        h2: (props) => <h2 className='text-2xl text-gray-400'>{props.children}</h2>,
        img: (props) => (
            <Image className='w-full h-auto' sizes="100vw"
                {...(props as ImageProps)}
            />
        ),
    }
}
```

### 3. code

引入插件和主题
```shell
pnpm add rehype-prism-plus prism-themes
```

将`rehype-prism-plus`加入MDX插件中：
```ts
import type { NextConfig } from "next";
import nextMdx from '@next/mdx';
import rehypePrismPlus from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js']
};

// Markdown Plugins
const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrismPlus],
  },
})

export default withMdx(nextConfig);
```

在css文件中引入特定主题即可：`@import 'prism-themes/themes/prism-one-dark.css';`

更多可选主题：https://github.com/PrismJS/prism-themes
```ts
@tailwind base;
@tailwind components;
@tailwind utilities;
@import 'prism-themes/themes/prism-one-dark.css';

```

### 4. 自定义code主题


### 5. mdx-remote

[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote#react-server-components-rsc--nextjs-app-directory-support)
```ts

```


## Hono RPC

创建`api/[[...routes]]/route.ts`文件，将所有`/api`的路由访问`route.ts`
```ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.get("/article/:id", (c) => c.json(`Hello Hono ${c.req.param("id")}`));

export const GET = handle(app);
```

## next-env

引入依赖：
```shell
pnpm add @next-env
```

在根目录下创建`.envConfig.ts`文件：
```ts
import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)
```

创建`.env`配置文件：
```env
HONO_SERVER_URL=http://localhost:8080

# postgres
POSTGRES_HOST=127.0.0.1
POSTGRES_POST=1111
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
```

读取配置文件：
```ts
export default function Home() {
  return (
    <>
      {process.env.HONO_SERVER_URL!}
    </>
  );
}
```


## Prisma + Postgresql

启动一个Postgres实例
```shell
# PostgreSQL
docker pull postgres:14.15
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14.15

docker exec -it postgres /bin/bash
docker exec -it postgres psql -U postgres
```

引入依赖，并初始化Prisma
```shell
pnpm i prisma@lates
pnpm prisma init --datasource-provider postgresql
```

执行完后，自动在根目录创建：`prisma/schema.prisma`，补充上`model`即表结构
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// model
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    String
}
```

配置数据库URL：
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"

# postgres
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/code_snippet?schema=Post"
```

执行数据迁移，创建表：
```shell
npx prisma migrate dev --name init
```

使用Prisma Client执行CRUD：
```ts
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = new Hono()
    .get("/:id", async (c) => {
        const post = await prisma.post.findUnique({
            where: { id: Number(c.req.param("id")) }
        });
        return c.json(post);
    })
    .post("", async (c) => {
        try {
            const request = await c.req.json();
            const post = await prisma.post.create({
                data: {
                    title: request.title,
                    content: request.content,
                    published: request.published,
                    author: request.author,
                },
            });
            return c.json(post);
        } catch (err) {
            console.error(err);
            return c.json({ code: 100001, message: `Post Create Failed` });
        }
    })
    .put("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const request = await c.req.json();
        try {
            const post = await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    title: request.title,
                    content: request.content,
                    published: request.published,
                    author: request.author,
                }
            })
            return c.json(post);
        } catch (err) {
            console.error(err);
            return c.json({ code: 100002, message: `Post ${id} Update Failed` });
        }
    })
    .delete("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const result = await prisma.post.delete({
            where: { id: id }
        });
        if (result === null) {
            return c.json({ code: 100003, message: `Post ${id} Not Exists` }, 404);
        }
        return c.json(result);
    })

export default app;
```

## Global Error Handler

