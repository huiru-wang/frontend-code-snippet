# 12-nextjs-routing

## Nextjs的文件夹和文件


### 文件夹：路由和组织页面；
- 路由：Nextjs通过文件夹实现约定路由；每一级文件夹都是一个路由segment；
```shell
app/
  |-- page.tsx                    localhost:3000/
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
- layout：共享布局，嵌套（包装）此目录下的UI，在children切换时，仍保留layout内的状态；
- template：类似于layout，但当children切换时，不保留状态；
- page：当前路由段的UI
- loading：在页面过渡或数据获取过程中提供视觉反馈，自动嵌套当前路径及子路由的UI，当路由切换时，自动显示；
- not-found(CSR)：当找不到对应的路由时，返回此UI；
- error：A Fallback UI，当出现未捕获处理的错误时，显示此UI；


## 0. 项目结构

后续
Layout：会以div包裹的样式出现；
page：会以卡片的样式出现；

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

在这里使用一个简单的带有边框的div来表示根UI在路由过程中的存在

`Root Page`将作为首页

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

访问：http://localhost:3000/，可以路由到`page.tsx`

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

访问：http://localhost:3000/dashboard，可以路由到`/dashboard/page.tsx`

并且可以看到 `Root Layout` 和 `Dashboard Layout` 都被渲染，形成嵌套结构

## 3. Link

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
