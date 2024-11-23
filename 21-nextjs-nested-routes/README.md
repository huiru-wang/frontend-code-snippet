# 20-nextjs-basic

## 1. 创建项目
```shell
pnpm dlx create-next-app@latest --ts --tailwind --eslint --app --src-dir --use-pnpm --import-alias "@/*"

-----
Progress: resolved 1, reused 1, downloaded 0, added 1, done
√ What is your project named? ... 20-nextjs-basic
√ Would you like to use Turbopack for next dev? ... No / Yes
```

## 2. Nextjs的文件夹和文件

1. 约定大于配置
2. 可提高代码的可读性和可维护性
3. 方便布局的共享和嵌套

### 文件夹：路由和组织页面；
- 路由：Nextjs通过文件夹实现约定路由；每一级文件夹都是一个路由segment；
```shell
app/
  |-- dashboard/ 
  |       |-- page.tsx            localhost:3000/dashboard
  |       |-- profile/
  |       |    |-- page.tsx       localhost:3000/dashboard/profile
  |       |-- settings/
  |       |    |-- page.tsx       localhost:3000/dashboard/settings
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

## 3. 实现RootLayout和RootPage

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

## 4. 基于文件系统的路由

创建`dashboard`文件夹、`dashboard/profile`文件夹、`dashboard/settings`文件夹
```shell
app/      
    |-- page.tsx                    localhost:3000
    |-- layout.tsx
    |-- dashboard/ 
    |       |-- layout.tsx
    |       |-- page.tsx            localhost:3000/dashboard
    |       |-- profile/
    |       |    |-- page.tsx       localhost:3000/dashboard/profile
    |       |-- settings/
    |       |    |-- page.tsx       localhost:3000/dashboard/settings

```

## 5. Link And Navigating

修改 `dashboard/layout.tsx`，添加2个Link导航，简单使用tailwindcss修饰一下，分别导航到`/dashboard/profile`和`/dashboard/settings`


## 6. metadata

为每个页面添加元数据，以提供SEO优化和用户体验

每个page.tsx可以指定其自己的元数据，通过`metadata`导出一个对象，该对象可以包含以下属性：

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Root',
  icons: '/favicon.ico',
  description: 'This is the root page',
}

export default function RootPage() {

  return (
    <div className="flex flex-col bg-orange-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
      <h2 className="text-2xl font-bold mb-6">
        Root Page
      </h2>
      <p className="text-2xl text-gray-600 pb-10">
        /page.tsx
      </p>
    </div>
  );
}
```

动态metadata，通常用于动态路由下的`metadata`，获取对应的`param`，处理动态的`metadata`
```tsx
export async function generateMetadata({ params }) {
  // 使用params
}
```

