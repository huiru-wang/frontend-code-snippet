# 26-nextjs-pages

## 1. 约定的特殊文件

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

## 2. layout和template

## 3. Error Boundary
错误边界（Error Boundaries）是一种用于捕获组件树中 JavaScript 错误的机制。它类似于一个 “安全网”，可以防止错误导致整个应用程序崩溃

当组件树中的某个部分发生错误时，错误边界可以捕获这个错误，并以一种更友好的方式进行处理，比如显示一个备用的 UI 或者记录错误信息

创建文件夹：about，文件：/about/page.tsx 和 /app/error.tsx, 模拟About组件渲染时，直接返回异常

当访问/about/page.tsx，会抛出异常，此时会触发error.tsx，并且会渲染error.tsx

```shell
app/      
  |-- about/ 
  |     |-- page.tsx
  |-- error.tsx
```

```tsx
// /about/page.tsx
export default function About() {
    throw new Error('This is a test error')
    return null
}
```
创建error.tsx，作为/about的子路由的错误边界，如果/about/error.tsx不存在，则寻找上一级的错误边界

```tsx
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

## 4. not-found
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


## 6. default
