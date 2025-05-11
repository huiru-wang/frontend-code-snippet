# 05-react-basic
- [初始化项目](#初始化项目)
  - [1. 初始化一个项目](#1-初始化一个项目)
  - [2. 使用vite](#2-使用vite)
  - [3. 引入React和TypeScript](#3-引入react和typescript)
  - [4. 配置TypeScript](#4-配置typescript)
  - [5. 配置项目入口，并启动项目](#5-配置项目入口并启动项目)
  - [6. 使用`Postcss` 和 `Tailwind CSS`](#6-使用postcss-和-tailwind-css)
- [routes](#routes)
## 初始化项目

从头开始构建一个React + TS + Tailwindcss项目，目标的项目结构：
```shell
05-react-vite-ts/
  │
  ├── public/                  # 静态资源目录，不会被 webpack 处理
  │   └── vite.svg             # 示例图片
  │
  ├── src/                     # 源代码目录
  │   ├── components/          # React 组件
  │   │   └── ExampleComponent.tsx  # 示例组件
  │   ├── pages/          
  │   │   └── Home.tsx
  │   ├── lib/          
  │   │   └── utils.ts
  │   │
  │   ├── App.tsx              # 根组件
  │   ├── App.css              # 全局样式文件
  │   ├── main.tsx             # 入口文件，用于渲染根组件
  │   └──vite-env.d.ts         # Vite 环境类型定义文件
  │
  ├── index.html               # Vite 的入口 HTML 文件
  ├── tsconfig.json            # TypeScript 配置文件
  ├── tsconfig.node.json
  ├── tsconfig.app.json      
  ├── vite.config.ts           # Vite 配置文件
  ├── tailwind.config.cjs      # Tailwind CSS 配置文件
  ├── postcss.config.cjs       # PostCSS 配置文件
  └── package.json
```

如果使用脚手架：`pnpm create vite`即可，再手动配置tailwindcss；

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

`vite`使用`esbuild`直接转译`ts`文件，无需Babel或tsc编译，因此只需要配置，不需要额外引入插件或依赖；
- `esbuild` 是一个用 Go 语言编写的超快速 JavaScript 和 TypeScript 编译器，主要用于代码转译、打包和压缩；
- 开发阶段：使用`esbuild`快速转译 TypeScript 和 JSX；
- 生产阶段：使用`esbuild`快速转译 TypeScript 和 JSX，并压缩代码；

通过3个文件配置TypeScript，通过`"include": [""]` 指定配置范围
- `tsconfig.json`: 根配置文件, 将下面2个文件的配置合并到一起。
- `tsconfig.app.json`: 用于编译src下的代码相关的TypeScript配置
- `tsconfig.node.json`: 用于编译`vite.config.ts`配置vite借助node来编译、构建、优化等相关的配置


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