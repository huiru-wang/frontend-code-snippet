# 23-nextjs-dynamic-routes

## Dynamic Routes

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

## loading

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
