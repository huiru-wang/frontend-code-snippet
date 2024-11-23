# 20-nextjs-basic

## 1. 创建项目
```shell
pnpm dlx create-next-app@latest --ts --tailwind --eslint --app --src-dir --use-pnpm --import-alias "@/*"

-----
Progress: resolved 1, reused 1, downloaded 0, added 1, done
√ What is your project named? ... 20-nextjs-basic
√ Would you like to use Turbopack for next dev? ... No / Yes
```

```shell
app/
  |-- about/
  |       |-- page.tsx            localhost:3000/about
  |-- posts/
  |       |- [id]/
  |       |    |- page.tsx        localhost:3000/posts/[id]
  |-- page.tsx                    localhost:3000
  |-- layout.tsx
  |-- error.tsx
  |-- loading.tsx
  |-- not-found.tsx
```

## 2. 约定的UI

Nextjs中每个文件夹下的特殊名字的文件有这不同的默认功能：

```shell
app/
  |-- layout.tsx       
  |-- template.tsx       
  |-- page.tsx       
  |-- loading.tsx
  |-- not-found.tsx
  |-- error.tsx
  |-- global-error.tsx
  |-- route.tsx
  |-- default.tsx
```
- `layout.tsx`：共享布局，嵌套（包装）此目录下的UI，在children切换时，仍保留layout内的状态；
- `template.tsx`：类似于layout，但当children切换时，不保留状态；
- `page.tsx`：当前路由段的UI
- `loading.tsx`：在页面过渡或数据获取过程中提供视觉反馈，自动嵌套当前路径及子路由的UI，当路由切换时，自动显示；
- `not-found.tsx`：当找不到对应的路由时，返回此UI；
- `error.tsx`：A Fallback UI，当出现未捕获处理的错误时，显示此UI；

其中：
在app目录下的`not-found.tsx`、`error.tsx`为全局文件，只要访问的页面不存在或异常未捕获，就会触发；
app的子孙目录下的为局部文件，必须指定的触发；


## 3. Error Boundary

错误边界（Error Boundaries）是一种用于捕获组件树中 JavaScript 错误的机制。它类似于一个 “安全网”，可以防止错误导致整个应用程序崩溃

当组件树中的某个部分发生错误时，错误边界可以捕获这个错误，并以一种更友好的方式进行处理，比如显示一个备用的 UI 或者记录错误信息

创建文件夹：`about`，文件：`/about/page.tsx` 和 `/app/error.tsx`, 模拟About组件渲染时，直接返回异常

当访问`/about/page.tsx`，会抛出异常，此时会触发`error.tsx`，并且会渲染`error.tsx`

```shell
app/      
  |-- about/ 
  |     |-- page.tsx
  |-- error.tsx
```

```ts
// /about/page.tsx
export default function About() {
    throw new Error('This is a test error')
    return null
}
```

创建`error.tsx`，作为`/about`的子路由的错误边界，如果`/about/error.tsx`不存在，则寻找上一级的错误边界

```ts
// /app/error.tsx
'use client'
import { useEffect } from 'react'

export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="bg-purple-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
            <h2 className="text-2xl font-bold mb-6">
                Error Page
            </h2>
            <p className="text-2xl text-gray-600 pb-8">
                /app/error.tsx
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again For Dashboard ErrorHandle
            </button>
        </div>
    )
}
```


## 4. Dynamic Routes

动态路由：路由段可以是一个参数，根据参数，返回不同的UI。基于文件系统路由则需要将一个文件夹变为可接受参数；即文件名命名为:[param]，因此segment就变为：/posts/[id]

SSR友好：根据动态参数，可以完全由服务端直接生成UI；

```shell
|-- app/      
    |-- posts/ 
    |    |-- [id]/
    |    |    |-- page.tsx
|-- lib/
    |-- api.ts
    |-- data.ts
    |-- types.ts
```

当访问：`/posts/1`，会渲染`/posts/[id]/page.tsx`，并传递组件参数：`params.id = 1`

创建一个SSR的`page.tsx`

```tsx
'use server'
import { ApiService } from '@/lib/api'
import Link from 'next/link'

export default async function PostPage({ params }: { params: { id: string } }) {

    // 确保 params 被 await 处理
    const { id } = await params;

    const post = await ApiService.fetchPosts(id)

    return (
        <article className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4"> Dynamic Routing : /posts/[id]/page.tsx</h1>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 mb-6">{post.content}</p>
            <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Post ID: {post.id}</p>
            </div>
            <br />
            <Link className="border-2 bg-slate-200" href="/">Back to Home</Link>
        </article>
    )
}
```

额外创建一个lib文件夹，放置type、mock的数据、api接口等文件
```ts
// lib/api.ts
import { posts } from "./data";
import type { Post } from "./types";

export const ApiService = {
    async fetchPosts(id: string): Promise<Post> {
        try {
            // 模拟耗时，后面用于显示loading
            await new Promise(resolve => setTimeout(resolve, 1000))
            if (!/^\d+$/.test(id)) {
                return { id: 0, title: 'not found', content: 'not found' };
            }
            const idNum = parseInt(id)
            const post = posts.find(post => post.id === idNum)
            if (post) {
                return post
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        return { id: 0, title: 'not found', content: 'not found' }
    }
}
```

## 5. loading

loading.tsx 是一个特殊的路由组件，当路由切换、数据异步加载、组件渲染中时，Next.js 会自动渲染 loading.tsx，从而实现loading效果;

```shell
|-- app/      
    |-- loading.tsx
```

```tsx
'use client'
export default function Loading() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-700"></div>
        </div>
    )
}
```

## 6. not-found
app目录下创建`not-found.tsx`，当全局的路由不存在时，会触发此组件，比如访问`/about/not-found`，会触发此组件

```tsx
'use client'
export default function RootNotFound() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h2 className='text-3xl font-bold'>
                Not Found For Root :(
            </h2>
        </div>
    )
}
```

子孙路由的not-found，只有显示调用`notFound()`时才会触发：通常用于在`layout`中手动判断pathname来触发局部404

```tsx
import { notFound } from "next/navigation";

export default function Profile() {

    // 显示调用
    notFound();

    return (
        <div>
        </div>
    );
}
```


## 6. Route Group

## 7. Parallel Routes

平行路由：文件夹以@开头，则认为是平行路由，此文件夹不会被识别为路由段。其子孙文件夹会被识别为路由段

```shell
app/
  |-- @team/
  |       |-- page.tsx 
  |-- @visitor/
  |       |-- page.tsx 
  |-- page.tsx 
  |-- layout.tsx
```

将@team和@visitor作为children组件，传给layout，执行渲染
```tsx
import Team from "./@team/page";
import Visitor from "./@visitor/page";
import "./globals.css";

export default function RootLayout({
  children,
  team,
  visitor
}: Readonly<{
  children: React.ReactNode;
  team: React.ReactNode;
  visitor: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-cyan-500 to-purple-500">

          <div className="flex flex-row justify-center items-center">
            {children}
          </div>

          <div className="mt-8 rounded-lg text-center flex-grow-2 flex flex-row justify-center items-center">
            {team}
            {visitor}
          </div>
        </div>
      </body>
    </html>
  );
}

```




## 8. Intercepting Routes

拦截路由：使访问同一个路由时，展示不同的效果；

比如Feed流浏览网站，在点击其中的某个内容时，不以跳转的方式展示，而是以弹窗的形式展示新的UI；当单独访问此Feed内容时，则是使用新的tab访问；

