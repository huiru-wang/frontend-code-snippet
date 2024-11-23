# 12-nextjs-routing

## Nextjs的文件夹和文件

### 文件夹：路由和组织页面；
- 路由：Nextjs通过文件夹实现约定路由；每一级文件夹都是一个路由segment；
```shell
app/
  |-- about/
  |       |-- page.tsx            localhost:3000/about
  |-- dashboard/ 
  |       |-- page.tsx            localhost:3000/dashboard
  |       |-- profile/
  |       |    |-- page.tsx       localhost:3000/dashboard/profile
  |       |-- settings/
  |       |    |-- page.tsx       localhost:3000/dashboard/settings
  |-- posts/
  |       |- [id]/
  |       |    |- page.tsx        localhost:3000/posts/[id]
  |-- page.tsx                    localhost:3000/
```


### 文件：对应路由的UI及约定的特殊文件

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


## 0. 项目结构

`page`：会以卡片的样式出现；

`Layout`：会以div包裹的样式来演示；

```shell
12-nextjs-routing
    |-- app/      
          |-- about/
          |       |-- page.tsx 
          |     
          |-- dashboard/ 
          |       |-- profile/
          |       |    |-- page.tsx
          |       |  
          |       |-- settings/
          |       |    |-- page.tsx 
          |       |
          |       |-- layout.tsx 
          |       |-- page.tsx 
          |      
          |-- posts/
          |       |- [id]/
          |       |    |- page.tsx
          |
          |-- layout.tsx      
          |-- page.tsx   
          
    |-- lib/
          |-- api.ts

    |-- components/

```


## 1. 实现RootLayout和RootPage

`Root Layout`将会在整个应用中，作为所有路由的根布局，它将包含整个页面的公共部分，例如导航栏、页脚等。

在这里使用一个简单的带有边框的`div`来表示根UI在路由过程中的存在

`Root Page`将作为首页展示

```ts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-cyan-500 to-purple-500">

        <div className=" border-4 border-dashed border-black mx-auto mt-4 min-h-96 p-0">
          <h1 className="font-mono text-2xl border-b-4 border-dashed border-black ">
            &nbsp;This is&nbsp;
            <span className="text-yellow-500 mr-2 ml-2 font-bold">
              Root Layout -&gt;
            </span>
            /layout.tsx
          </h1>

          {children}
        </div>
      </body>
    </html>
  );
}
```

```ts
export default function RootPage() {

  return (
    <div className="bg-orange-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
      <h2 className="text-2xl font-bold mb-6">
        Root Page
      </h2>
      <p className="text-2xl text-gray-600">
        /page.tsx
      </p>
    </div>
  );
}
```

访问：[http://localhost:3000](http://localhost:3000)，可以路由到`page.tsx`

## 2. 嵌套路由：dashboard

```shell
12-nextjs-routing
    |-- app/      
          |-- dashboard/ 
          |       |-- layout.tsx 
          |       |-- page.tsx 
          |      
```


创建文件夹：`dashboard`，文件：`layout.tsx` 、`page.tsx`

```ts
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    return (
        <div className="border-4 border-dashed border-red-300 mx-auto min-h-96 p-0 w-full">
            <div className="font-mono text-2xl border-b-4 border-dashed border-red-300 ">
                <h1>
                    &nbsp;This is&nbsp;
                    <span className="text-red-300 mr-2 ml-2 font-bold">
                        Dashboard Layout -&gt;
                    </span>
                    /dashboard/layout.tsx
                </h1>
            </div>

            <div className="flex flex-row justify-center items-center min-h-96">
              {children}
            </div>
        </div>
    );
}
```

```ts
export default function Dashboard() {
    return (
        <div className="bg-orange-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
            <h2 className="text-2xl font-bold mb-6">
                Dashboard Page
            </h2>
            <p className="text-2xl text-gray-600">
                /dashboard/page.tsx
            </p>
        </div>
    );
}
```

访问：[http://localhost:3000/dashboard](http://localhost:3000/dashboard)，可以路由到`/dashboard/page.tsx`

并且可以看到 `Root Layout` 和 `Dashboard Layout` 都被渲染，形成嵌套结构

## 3. Link And Navigating

```shell
12-nextjs-routing
    |-- app/      
          |-- dashboard/ 
          |       |-- profile/
          |       |    |-- page.tsx
          |       |  
          |       |-- settings/
          |       |    |-- page.tsx 
          |       |
          |       |-- layout.tsx 
          |       |-- page.tsx 
          |
          |-- layout.tsx      
          |-- page.tsx   
```

创建 `/profile/page.tsx` 和 `/settings/page.tsx`

同样使用简单的卡片表示page

```ts
export default function Profile() {

    return (
        <div className="bg-stone-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
            <h2 className="text-2xl font-bold mb-6">个人资料</h2>
            <p className="text-2xl first-line:text-gray-600">
                /dashboard/profile/page.tsx
            </p>
        </div>
    )
}
```

修改 `dashboard/layout.tsx`，添加2个Link导航，简单使用tailwindcss修饰一下，分别导航到`/dashboard/profile`和`/dashboard/settings`

```ts
import Loading from "../loading";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    return (
        <div className="border-4 border-dashed border-red-300 mx-auto min-h-96 p-0 w-full">
            <div className="font-mono text-2xl border-b-4 border-dashed border-red-300 ">
                <h1>
                    &nbsp;This is&nbsp;
                    <span className="text-red-300 mr-2 ml-2 font-bold">
                        Dashboard Layout -&gt;
                    </span>
                    /dashboard/layout.tsx
                </h1>

                <div className="flex gap-8 items-center justify-center font-mono font-bold mb-4 text-4xl">
                    <Link
                        className={
                            `${/^\/dashboard\/profile/.test(pathname) ? "text-gray-200 border-b-2" : "text-rose-400"}`
                        }
                        href="/dashboard/profile">
                        profile
                    </Link>
                    <Link
                        className={
                            `${/^\/dashboard\/settings/.test(pathname) ? "text-gray-200 border-b-2" : "text-rose-400"} `
                        }
                        href="/dashboard/settings">
                        settings
                    </Link>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center min-h-96">
                {children}
            </div>
        </div>
    );
}
```


## 4. Error Boundary

错误边界（Error Boundaries）是一种用于捕获组件树中 JavaScript 错误的机制。它类似于一个 “安全网”，可以防止错误导致整个应用程序崩溃

当组件树中的某个部分发生错误时，错误边界可以捕获这个错误，并以一种更友好的方式进行处理，比如显示一个备用的 UI 或者记录错误信息

创建文件夹：`monitor`，文件：`/monitor/page.tsx` 和 `dashboard/error.tsx`, 模拟Monitor组件渲染时，直接返回异常

当访问`/dashboard/monitor`，会抛出异常，此时会触发`error.tsx`，并且会渲染`error.tsx`

```shell
12-nextjs-routing
    |-- app/      
          |-- dashboard/ 
          |       |-- monitor/
          |       |    |-- page.tsx  
          |       |-- error.tsx
          |      
```
```ts
// /monitor/page.tsx
export default function Monitor() {
    throw new Error('This is a test error')
    return null
}
```

创建`error.tsx`，作为`/dashboard`的子路由的错误边界，如果`/dashboard/error.tsx`不存在，则寻找上一级的错误边界

```ts
// /dashboard/error.tsx
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
                /dashboard/error.tsx
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


## 5. Dynamic Routes

动态路由：路由段可以是一个参数，根据参数，返回不同的UI。基于文件系统路由则需要将一个文件夹变为可接受参数；即文件名命名为:[param]，因此segment就变为：/posts/[id]

SSR友好：根据动态参数，可以完全由服务端直接生成UI；

```shell
12-nextjs-routing
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

## 6. loading

loading.tsx 是一个特殊的路由组件，当路由切换、数据异步加载、组件渲染中时，Next.js 会自动渲染 loading.tsx，从而实现loading效果;

```shell
12-nextjs-routing
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

