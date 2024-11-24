# 30-nextjs-prisma


1. 引入Prisma
```shell
pnpm i prisma@latest -D
```

2. 初始化数据源，以sqlite为例，不需要额外准备或启动外部数据库服务
```shell
pnpm prisma init --datasource-provider sqlite
```
执行完成后自动创建：`/prisma/schema.prisma`文件，在此基础上，增加`User`、`Post`两个model
```prisma

// prisma与DB交互的客户端
generator client {
  provider = "prisma-client-js"
}

// DB相关元数据
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// 数据模型
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

3.执行数据迁移、创建数据库db文件
```shell
pnpm prisma migrate dev --name init
```
会自动生成以下文件：

```shell
prisma/
    |-- dev.db
    |-- migrations/
            |-- 20230925150107_init/
                    |-- migration.sql
.env
```
其中`.env`文件用于配置数据库连接信息，这里是sqlite，无需配置其他信息，直接执行本地db查询和插入
```env
DATABASE_URL="file:./dev.db"
```


## 使用Prisma Client API

1. 创建db交互客户端: `/scr/db.ts`
```ts
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(name: string, email: string): Promise<User> {
    // ... you will write your Prisma Client queries here
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        },
    })
    return user;
}

export async function getUser(id: number) {
    // ... you will write your Prisma Client queries here
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
    return user
}
```

2. 创建`/app/api/route.ts`，以执行数据库操作
```ts
import { createUser, getUser } from "@/db"
import { NextRequest, NextResponse } from "next/server"

// get
export const GET = async (request: NextRequest) => {
    const searchParam = request.nextUrl.searchParams;
    const id = Number(searchParam.get("id"))
    const user = await getUser(id)
    return NextResponse.json({
        success: true,
        user,
    })
}

// 创建
export const POST = async (request: NextRequest) => {
    const { name, email } = await request.json();
    const user = await createUser(name, email);
    return NextResponse.json({
        success: true,
        user,
    })
}
```

3. 执行POST请求，创建用户，可以在浏览器console执行：
```js
fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'will',
        email: 'will@gmail.com'
    })
}).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
```

4. 执行GET请求，获取用户: http://localhost:3000/api?id=1


