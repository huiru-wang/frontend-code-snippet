# 05-react-basic
- [初始化项目](#初始化项目)
  - [1. 初始化一个项目](#1-初始化一个项目)
  - [2. 使用vite](#2-使用vite)
  - [3. 引入React和TypeScript](#3-引入react和typescript)
  - [4. 配置TypeScript](#4-配置typescript)
  - [5. 配置项目入口，并启动项目](#5-配置项目入口并启动项目)
  - [6. 使用`Postcss` 和 `Tailwind CSS`](#6-使用postcss-和-tailwind-css)
- [脚手架快速创建]
- [项目结构](#项目结构)
- [父子组件传递props](#父子组件传递props)
- [routes](#routes)
## 初始化项目

### 1. 初始化一个项目
```shell
mkdir 05-react-vite-ts
cd 05-react-vite-ts
pnpm init
```

```json
{
  "name": "05-react-vite-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### 2. 使用vite
1. 引入开发依赖 `vite`
```shell
pnpm add vite @vitejs/plugin-react -D
```

```json
{
  "name": "05-react-vite-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",  // 增加vite插件
    "vite": "^5.4.11"
  }
}
```

2. 创建`vite.config.ts`配置文件
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```


### 3. 引入React和TypeScript

引入依赖`react`、`react-dom` 和 开发依赖`@types/react`、`@types/react-dom`
```shell
pnpm add react react-dom
pnpm add @types/react @types/react-dom -D
```
```json
{
  "name": "05-react-vite-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  
  // 开发依赖
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "vite": "^5.4.11"
  },
  
  // 增加生产依赖 react、react-dom
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

### 4. 配置TypeScript

通过3个文件配置TypeScript，通过`"include": [""]` 指定配置范围
- `tsconfig.json`: 根配置文件
- `tsconfig.app.json`: 配置react中src下的代码相关的TypeScript配置
- `tsconfig.node.json`: 配置vite借助node来编译、构建、优化等相关的配置

```json
{
    "files": [],
    "references": [
        {"path": "./tsconfig.app.json"},
        {"path": "./tsconfig.node.json"}
    ]
}
```
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": [
            "ES2020",
            "DOM",
            "DOM.Iterable"
        ],
        "module": "ESNext",
        "skipLibCheck": true,
        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "isolatedModules": true,
        "moduleDetection": "force",
        "noEmit": true,
        "jsx": "react-jsx",
        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"]
}
```
```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": [
            "ES2023"
        ],
        "module": "ESNext",
        "skipLibCheck": true,
        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "isolatedModules": true,
        "moduleDetection": "force",
        "noEmit": true,
        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": [
        "vite.config.ts", "./scripts"]
}
```

### 5. 配置项目入口，并启动项目

1. 新建`index.html`，作为入口
```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>React-basic</title>
</head>

<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```
2. 创建`src/main.tsx`
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div>Hello React</div>
    </StrictMode>
)
```

3. 修改scripts
```json
{
    ...
    
    "scripts": {
        "dev": "npx vite",
        "build": "npx tsc -b && npx vite build"
    },  
    
    ...
}
```
4. 启动项目
```shell
pnpm i
pnpm dev
```
项目结构
```shell
05-react-vite-ts
    |- src/
        |- main.tsx
    |- index.html
    |- package.json
    |- tsconfig.json
    |- tsconfig.app.json
    |- tsconfig.node.json
    |- vite.config.ts
```

### 6. 使用`Postcss` 和 `Tailwind CSS`
1. 安装开发依赖
```shell
pnpm add postcss postcss-loader tailwindcss autoprefixer -D
```

2. 配置Postcss，创建：`postcss.config.cjs`

```cjs
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {}
    },
};
```

3. 配置Tailwind CSS， 创建：`tailwind.config.cjs`
```cjs
module.exports = {
    // 扫描文件，编译时，扫描文件生成css，切忌加入.css
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
};
```

4. 使用Tailwind CSS，新建`main.css`中加入
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
#root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```
5. 在`main.tsx`中使用Tailwind CSS
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="text-3xl font-bold underline bg-purple-300">
            Hello React
        </div>
    </StrictMode>
)
```

## 脚手架快速创建
```shell
pnpm create vite@latest
```
继续安装Tailwindcss
```shell

```

## 项目结构
```shell
src/
    |- components/              # 基础组件
    |       |- Navbar.tsx
    |       |- Tag.tsx
    |- lib/                     # 类型、数据
    |       |- types.ts
    |       |- data.ts
    |- pages/                   # 视图
    |       |- TagList.tsx
    |       |- BlogList.tsx
    |       |- About.tsx
    App.tsx
    main.tsx
index.html
```

## 父子组件传递props
```tsx
// 父组件 传递props
const App: React.FC<{}> = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogPosts)

  // 点赞，将指定id的博客的like + 1
  const like = (id: number) => {
    setBlogs(
        blogs.map(blog => {
          if (blog.id === id) {
            return { ...blog, like: blog.like + 1 }
          } else {
            return blog
          }
        })
    )
  }

  return (
    <>
        // 传递props
        <BlogList blogs={blogs} like={like} />
    </>
  )
}
```
```tsx
// 子组件 接收props
interface BlogListProps {
    blogs: BlogPost[];
    like: (id: number) => void;
}
// 函数入参解构interface，获取blogs、like函数
export const BlogList: React.FC<BlogListProps> = ({ blogs, like }) => {

    return (
        <div>
            {
                // 父组件props
                blogs.map((blog) => (
                    <div>
                        // title
                        <div>
                            <h2>{blog.title}</h2>
                        </div>

                        // 点赞按钮，将父组件函数绑定在button上，点击button则调用父组件函数
                        <div>
                            <button
                                onClick={() => like(blog.id)}>
                                Like {blog.like}
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}
```

## routes

1. 引入路由组件
```shell
pnpm add react-router-dom@6
```

2. 使用路由

`<Routes>`组件内根据path进行匹配，匹配成功则渲染对应的组件

当访问首页，则渲染`BlogList`组件；

`<NavLink>`组件中有`NavLink`组件，进行路由；

```tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// 声明路由path和对应绑定的组件，当前路由匹配成功，则渲染对应的组件
const App: React.FC<{}> = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path='/tags' element={<TagList />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
```

`<NavLink>`组件可以执行路由，填转到对应的path，path变更，APP内的`<Routes>`渲染的组件也会变更
```tsx
// 使用NavLink组件，执行路由跳转
export const Navbar: React.FC<NavbarProps> = () => {

    return (
        <div>
            <h1> Blog </h1>
            <nav>
                <NavLink to={'/'} > Posts </NavLink>
                <NavLink to={'/Tags'} > Tags </NavLink>
                <NavLink to={'/about'} > About </NavLink>
            </nav>
        </div>
    )
}
```