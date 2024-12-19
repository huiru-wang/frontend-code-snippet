# 30-nextjs-prisma


## 1. 项目结构
```shell
prisma/
  |-- schema.prisma
src/
  |--actions/
  |    |-- posts.ts
  |
  |--app/
  |    |-- api/
  |        |-- posts/
  |                |-- route.ts
  |--types/
  |    |-- index.ts
.env
```

## 2. postgresql实例

启动一个Postgres实例
```shell
# PostgreSQL
docker pull postgres:14.15
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14.15

docker exec -it postgres /bin/bash
docker exec -it postgres psql -U postgres
```

## 3. Prisma
```shell
pnpm i prisma@latest -D
```

初始化数据源，以sqlite为例，不需要额外准备或启动外部数据库服务
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

创建`.env`文件用于配置数据库连接信息
```env
# postgresql
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/code_snippet?schema=Post"
```

执行数据迁移、创建数据库db文件
```shell
pnpm prisma migrate dev --name init
```

自动生成以下文件：
```shell
prisma/
    |-- dev.db
    |-- migrations/
            |-- 20230925150107_init/
                    |-- migration.sql
```


## 4. 数据库交互

创建db交互客户端: `src/actions/posts.ts`
```ts
import { CreatePostRequest } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get post by id
 * 
 * @param id id
 * @returns post
 */
export const getPostById = async (id: number) => {
    return await prisma.post.findUnique({
        where: { id: id }
    });
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
```

创建`/app/api/posts/route.ts`，以执行数据库操作
```ts
import { createUser, getUser } from "@/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    const searchParam = request.nextUrl.searchParams;
    const id = Number(searchParam.get("id"))
    const user = await getUser(id)
    return NextResponse.json({
        success: true,
        user,
    })
}
export const POST = async (request: NextRequest) => {
    const { name, email } = await request.json();
    const user = await createUser(name, email);
    return NextResponse.json({
        success: true,
        user,
    })
}
```

## 5. 启动访问
启动项目，访问：
- [GET http://localhost:3000/api/posts/1](http://localhost:3000/api/posts/1)
- [POST http://localhost:3000/api/posts](http://localhost:3000/api/posts)
