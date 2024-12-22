
# 项目配置

创建项目：
```shell
pnpm create next-app [your-project-name] --ts --tailwind --eslint  --app  --src-dir --use-pnpm --import-alias "@/*"
```

引入需要的相关依赖：
```shell
# mdx相关
pnpm add @mdx-js/loader @mdx-js/react next-mdx-remote @next/env rehype-prism-plus prism-themes

# hono相关
pnpm add hono zod

# prisma相关
pnpm add prisma @prisma/client
```


# Tailwindcss 配置

1. 将`_components`添加到`tailwind.config.js`中
2. 导入`@tailwindcss/typography`插件
```ts
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
```

# Markdown
```shell
mdx
├── hello-world.md
├── web3/
│    └── solidity.md
│          
src
├── app/
│    ├── posts/
│    │   ├── [slug]
│    │   │     │── page.ts
│    │   │     └── layout.tsx
├── lib/
│    ├── markdown/
│    │      └── index.ts
```

`src/app/posts/[slug]/page.ts`：渲染对应的markdown文件；

`src/lib/markdown/index.ts`：Markdown的解析和渲染工具；

`mdx/`：本地的Markdown文件；


## Markdown文件读取和解析

本地存储Markdown文件，通过动态路由，选择读取的目标文件位置，读取文件内容，完成渲染；
    - 根据动态路由`slug`，读取目标文件；
    - 实现2层的目录嵌套；如slug为：`/posts/web3_solidity.md`，则表示读取`/mdx/web3/solidity.mdx`文件；

根据`slug`，读取目标文件，并渲染；
```ts
// src/app/posts/[slug]/page.ts
import { getMdPostBySlug } from "@/lib/markdown";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const { frontmatter } = await getMdPostBySlug(slug);

    return {
        title: frontmatter.title,
        description: frontmatter.description,
    };
}

export default async function Page({ params }) {

    const { slug } = await params;

    const { content, frontmatter } = await getMdPostBySlug(slug)

    return (
        <div className="w-1/2">
            <div>
                {frontmatter.title}
            </div>
            <div className="markdown-body mt-10">
                {content}
            </div>
        </div>
    )
}
```

实现`page.ts`中的`getMdPostBySlug`方法，读取并解析markdown文件
- 根据slug，如果是id类型，则从数据库读取（后面使用`prisma`读取）；如果是文本类型，则解析为本地文件路径，本地读取；
- 使用`next-mdx-remote`的`compileMDX`解析MD、MDX，获取解析完成的`content`和`frontmatter`
```ts
src/lib/markdown/index.ts
import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import { getPostById } from '../db';

export type Frontmatter = {
    title: string;
    keywords: string;
    date: string;
    description: string;
}

const postParentDir = "mdx";
const mdxBaseDir = path.join(process.cwd(), postParentDir);

/**
 * 根据slug读取并解析md、mdx
 * @param slug slug
 * @returns {content, frontmatter}
 */
export const getMdPostBySlug = async (slug: string): Promise<{ content, frontmatter }> => {

    let postMdxContent;
    if (Number.isInteger(Number(slug))) {
        const post = await getPostById(Number(slug));
        postMdxContent = post?.content;
    } else {
        const targetMdx = slug?.split('_').join('/');
        const targetMdxPath = path.join(mdxBaseDir, `${targetMdx}.md`);
        postMdxContent = fs.readFileSync(targetMdxPath, 'utf8');
    }
    return parseMdx(postMdxContent);
}

/**
 * 解析markdown内容
 * @param content 文件内容
 * @returns {content, frontmatter}
 */
export const parseMdx = async (content: string): Promise<{ content: unknown, frontmatter: Frontmatter }> => {

    return compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true
        },
    });
}
```

## 使用`rehype-prism-plus`实现代码块的高亮

1. 引入`rehype-prism-plus`，加入码块高亮；
```ts
import rehypePrismPlus from 'rehype-prism-plus';

/**
 * 解析markdown内容
 * @param content 文件内容
 * @returns {content, frontmatter}
 */
export const parseMdx = async (content: string): Promise<{ content: unknown, frontmatter: Frontmatter }> => {

    return compileMDX<{ title: string, date: string, description: string }>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }]],
            }
        },
    });
}
```

2. 加入代码高亮的css样式

- 添加文件：`styles/prism.css`，实现代码块的某行高亮；对应的css在[rehype-prism-plus#styling](https://github.com/timlrx/rehype-prism-plus?tab=readme-ov-file#styling)中获取
- 在`styles/globals.css`中引入`prism-themes`和`prism.css`；
- `prism-themes`可以在仓库中选择适合的CodeBlock的主题；[PrismJS/prism-themes](https://github.com/PrismJS/prism-themes)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import 'prism-themes/themes/prism-night-owl.css';
@import './prism.css';
```



## not-found

创建：`/src/posts/[slug]/not-found.tsx`，在读取不到对应的markdown文件时，主动调用`notFound()`;
```ts
// src/app/posts/[slug]/page.ts
import { notFound } from "next/navigation";

export default async function Page({ params }) {

    const { slug } = await params;

    const { content, frontmatter } = await getMdPostBySlug(slug);

    if (!content) {
        // 路由到/src/posts/[slug]/not-found.tsx
        return notFound();
    }

    return (
        <div className="w-1/2">
            <div>
                {frontmatter?.title}
            </div>
            <div className="markdown-body mt-10">
                {content}
            </div>
        </div>
    )
}
```

创建


# Prisma

```shell
prisma
├── schema.prisma
│
src
├── lib/ 
│    ├── db/
│    │   └── index.ts
.env
```

`prisma/schema.prisma`：定义数据库的schema，包括表名、字段名、字段类型等；

`src/lib/db/index.ts`：数据库CRUD；


## postgresql实例

启动一个Postgres实例
```shell
# PostgreSQL
docker pull postgres:14.15
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14.15

docker exec -it postgres /bin/bash
docker exec -it postgres psql -U postgres
```

## Prisma初始化

初始化数据源postgresql
```shell
pnpm prisma init --datasource-provider postgresql
```

执行完成后自动创建：`/prisma/schema.prisma`文件，在此基础上，增加`Post`model
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
  tags      String[]
  category  String
  content   String?
  published Boolean  @default(false)
  author    String
}
```

## 相关的命令
```shell
# 数据迁移
npx prisma migrate dev

# 重置数据库，重新迁移
npx prisma migrate reset

# 每次修改文件需要执行此命令，生成 prisma client
npx prisma generate
```

## prisma studio

启动studio，访问：[http://localhost:5555](http://localhost:5555)
```shell
pnpm prisma studio
```

## CRUD

创建`lib/db/index.ts`作为数据库操作封装

```ts
import { PrismaClient } from '@prisma/client';

// prisma client
const prisma = new PrismaClient();

export type CreatePostRequest = {
    title: string;
    content: string;
    tags: string[];
    category: string;
    published: boolean;
    author: string;
}

export type UpdatePostRequest = CreatePostRequest & { id: number };

/**
 * Get post by id
 * 
 * @param id id
 * @returns post
 */
export const getPostById = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: { id: id }
    });
    return post;
}

/**
 * Create post
 * 
 * @param createRequest createRequest
 * @returns created post
 */
export const createPost = async (createRequest: CreatePostRequest) => {
    const post = await prisma.post.create({
        data: {
            title: createRequest.title,
            content: createRequest.content,
            tags: createRequest.tags,
            category: createRequest.category,
            published: createRequest.published,
            author: createRequest.author,
        },
    });
    return post;
}

/**
 * Update post
 * 
 * @param updateRequest updateRequest
 * @returns updated post
 */
export const updatePost = async (updateRequest: UpdatePostRequest) => {
    const id = updateRequest.id;
    const post = await getPostById(id);
    if (!post) {
        return;
    }
    const updatedPost = await prisma.post.update({
        where: {
            id: post?.id
        },
        data: {
            title: updateRequest.title || post?.title,
            content: updateRequest.content || post?.content,
            tags: updateRequest.tags || post?.tags,
            category: updateRequest.category || post?.category,
            published: updateRequest.published || post?.published,
            author: updateRequest.author || post?.author,
        }
    })
    return updatedPost;
}

/**
 * Delete post by id
 * 
 * @param id id
 * @returns delete result
 */
export const deletePost = async (id: number) => {
    const post = await getPostById(id);
    if (!post) {
        return;
    }
    const result = await prisma.post.delete({
        where: { id: Number(id) }
    });
    if (result) {
        return true;
    } else {
        return false;
    }
}
```


# Hono

使用hono代理Nextjs的api路由：
```shell
src
├── app/
│    ├── api/
│    │   ├── [[...route]]
│    │   │         └── route.ts
│     
├── server/
│    ├── main.ts
│    ├── posts.ts
```

## hono服务端
1. 创建`src/server/main.ts`文件，作为后端API服务端；

```ts
// src/server/main.ts
import { Hono } from 'hono';
import { cors } from "hono/cors";
import posts from './posts';

const app = new Hono().basePath("api")
app.use(
    "*",
    cors({
        origin: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
        allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    }),
);

app.route("/posts", posts);

export default app;
```

2. 创建`src/server/posts.ts`文件，处理posts相关的CRUD；

```ts
// src/server/posts.ts
import { Hono } from "hono";
import { getPostById, createPost, updatePost, deletePost } from '@/lib/datasource';

const app = new Hono()
    .get("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const post = await getPostById(id);
        return c.json(post);
    })
    .post("", async (c) => {
        const request = await c.req.json();
        const createRequest = {
            title: request.title,
            content: request.content,
            tags: request.tags,
            category: request.category,
            published: request.published,
            author: request.author,
        };
        const post = await createPost(createRequest);
        return c.json(post);
    })
    .patch("/:id", async (c) => {
        const id = c.req.param("id");
        const request = await c.req.json();
        const updateUpdate = {
            id: Number(id),
            title: request.title,
            content: request.content,
            tags: request.tags,
            category: request.category,
            published: request.published,
            author: request.author,
        };
        const post = await updatePost(updateUpdate);
        return c.json(post);
    })
    .delete("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const post = await deletePost(id);
        return c.json(post);
    });

export default app;
```

## Nextjs API路由由hono代理

创建`api/[[...route]]/route.ts`文件，引入hono，将所有的RestAPI路由都由hono处理：
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

# zod数据验证

[zod.dev](https://zod.dev/?id=introduction)

Zod is a TypeScript-first schema declaration and validation library

## 定义schema

针对Hono的CRUD中的create、update定义2个schema，约束入参的校验逻辑：

创建`src/lib/schema/posts.ts`:
```ts
import { z } from 'zod';

export const postCreateSchema = z.object({
    title: z.string().max(20, { message: 'Title must be less than 20 characters' }),
    content: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    slug: z.string(),
    keywords: z.string(),
    description: z.string(),
    published: z.boolean(),
    author: z.string(),
});

export const postUpdateSchema = z.object({
    id: z.number(),
    title: z.string().max(20, { message: 'Title must be less than 20 characters' }),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    slug: z.string().optional(),
    keywords: z.string().optional(),
    description: z.string().optional(),
    published: z.boolean().optional(),
    author: z.string().optional(),
});
```

## 使用schema校验入参

以`post`和`patch`执行创建、更新为例：
```ts
import { Hono } from "hono";
import { getPostById, createPost, updatePost, deletePost } from '@/lib/db';
import { postCreateSchema, postUpdateSchema } from "@/lib/schema/posts";

const app = new Hono()
    .post("", async (c) => {
        const request = await c.req.json();
        // 解析入参
        const parsedCreateRequest = postCreateSchema.safeParse(request);
        if (!parsedCreateRequest.success) {
            return c.json({ error: parsedCreateRequest.error.errors }, 400);
        }
        const post = await createPost(parsedCreateRequest.data);
        return c.json(post);
    })
    .patch("", async (c) => {
        const request = await c.req.json();
        // 解析入参
        const parsedUpdateRequest = postUpdateSchema.safeParse(request);
        if (!parsedUpdateRequest.success) {
            // 解析失败，存在不合法参数
            return c.json({ error: parsedUpdateRequest.error.errors }, 400);
        }
        // 解析成功，获取自动组装好的数据对象data
        const post = await updatePost(parsedUpdateRequest.data);
        return c.json(post);
    })

export default app;
```

## 测试

POST http://localhost:3000/api/posts

当body参数缺失，收到了响应：
```json
{
    "error": [
        {
            "code": "invalid_type",
            "expected": "string",
            "received": "undefined",
            "path": [
                "slug"
            ],
            "message": "Required"
        }
    ]
}
```

# SEO

在`page.ts`中设置相应的metadat，是一个页面的基础SEO方式；
- metadata常量
- generateMetadata函数

下面是`about`页面的metadata设置：这里没什么动态内容，可以使用 `metadata` 常量设置
```ts
import { Metadata } from "next";

// SEO
export const metadata: Metadata = {
    title: "web developer portfolio",
    description: "web developer portfolio",
};

export default function Layout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>{children}</div>
}
```

对应动态更新的`posts`页面，使用`generateMetadata`函数动态生成metadata：

读取frontmatter，生成metadata
```ts
import { getMdPostBySlug } from "@/lib/markdown";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const { frontmatter } = await getMdPostBySlug(slug);

    return {
        title: frontmatter.title,
        keywords: frontmatter.keywords,
        description: frontmatter.description,
    };
}
```