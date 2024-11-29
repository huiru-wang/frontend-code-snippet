# 00-project-basic

## 初始化项目

### 1. 初始化一个项目
```shell
mkdir 00-project-basic
cd 00-project-basic
pnpm init
```

```json
{
  "name": "00-project-basic",
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
  "name": "00-project-basic",
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
  "name": "00-project-basic",
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
```typescript
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
00-project-basic
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





## useState

`useState`是React Hooks中的一个基础Hook，用于在函数组件中添加状态。它允许函数组件拥有和管理自己的状态，就像类组件中的`this.state`一样

```tsx
const [count, setCount] = useState(0);
```
- count：状态；
- setCount：更新状态的函数；
- 传入初始值0

例子：
```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
```
```tsx
// src/App.tsx
import { useState } from 'react'

function App() {
    // int useState，初始化count为0
    const [count1, setCount1] = useState<number>(0);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <button
                    className='border-solid border-2 border-gray-200 bg-red-300 p-2'
                    onClick={() => setCount1(count1 + 1)}>
                    Click Count {count1}
                </button>
            </div>
        </div>
    )
}
export default App
```

### 异步更新

```tsx
// src/App.tsx
import { useState } from 'react'

function App() {
    // int useState，初始化count为0
    const [count1, setCount1] = useState<number>(0);
    const [count2, setCount2] = useState<number>(0);
    const [count3, setCount3] = useState<number>(0);

    const setCountWithValue = () => {
        // setCount是异步操作，且会通过队列执行，如果是相同的操作，则会被去重
        setCount2(count2 + 1)
        setCount2(count2 + 1)
    }

    const setCountWithCallback = () => {
        // 使用回调函数，则不会被去重，每次执行都会拿到当前的最新值
        setCount3((current) => current + 1)
        setCount3((current) => current + 1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <button
                    className='border-solid border-2 border-gray-200 bg-red-300 p-2'
                    onClick={() => setCount1(count1 + 1)}>
                    Click Count {count1}
                </button>
            </div>

            <div >
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={setCountWithValue}>
                    Click and Set two times : {count2}
                </button>
            </div>

            <div >
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={setCountWithCallback}>
                    Click and Set two times : {count3}
                </button>
            </div>
        </div>
    )
}
export default App
```


### 浅比较

```tsx
import { useState } from 'react'

function App() {
    /**
     * 浅比较，更新数组、对象
     */
    const [customArray, setCusotmArray] = useState<number[]>([1]);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                {/* 
                []: 创建新数组
                [...customArray, element]: 将原数组解构放入新数组，并增加一个新元素，触发更新 
                */}
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={() => setCusotmArray([...customArray, customArray.length + 1])}
                >
                    push elemen
                </button>
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={() => setCusotmArray([1])}
                >
                    clear element
                </button>
                <p className='border-solid border-2 border-gray-200'>
                    {customArray.map((item, index) => index === 0 ? item : "," + item)}
                </p>
            </div>
        </div>
    )
}
export default App
```
setState通过比对state的引用地址，来判断是否需要更新，如果引用地址没有变化，则不会更新，如果引用地址发生了变化，则需要更新；

因此每次更新数组和对象时，需要传入新的数组、对象，而不是直接修改原数组、对象，否则不会触发更新。

