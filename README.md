# Learn React

- [00-project-basic](#00-project-basic)
- [01-react-basic](#01-react-basic)
- [02-react-hook-useState](#02-react-hook-useState)
- [06-react-hook-useEffect](#06-react-hook-useEffect)

## 00-project-basic
### 初始化
```shell
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

### 使用vite
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


### React + TypeScript

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

### 配置TypeScript

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

### 配置项目入口

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

### 使用`Postcss` 和 `Tailwind CSS`
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



## 01-react-basic

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

### 父子组件传递props
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

// 子组件 接收props
interface BlogListProps {
    blogs: BlogPost[];
    like: (id: number) => void;
}
// 解构interface，获取blogs、like函数
export const BlogList: React.FC<BlogListProps> = ({ blogs, like }) => {

    return (
        <div className="blog-list">
            {
                // 父组件props
                blogs.map((blog) => (
                    <div className="blog-card">
                        // title
                        <div className="blog-card-title">
                            <h2>{blog.title}</h2>
                        </div>

                        // 点赞按钮，并执行父组件函数
                        <div>
                            <button
                                className="like-button"
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

### routes

1. 引入路由组件
```shell
pnpm add react-router-dom@6
```
```tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
```

2. 使用路由
```tsx

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

// 使用NavLink组件，执行路由跳转
export const Navbar: React.FC<NavbarProps> = () => {

    return (
        <div className="nav">
            <h1 className="title"> Blog </h1>
            <nav className="nav-links">
                <NavLink className="nav-link" to={'/'} > Posts </NavLink>
                <NavLink className="nav-link" to={'/Tags'} > Tags </NavLink>
                <NavLink className="nav-link" to={'/about'} > About </NavLink>
            </nav>
        </div>
    )
}
```

# 02-react-hook-useState

useState的2个关键点
1. set值和set回调函数的区别
2. state为对象(数组)时，返回新的引用，而不是在原有的对象(数组)上修改

## 1.set值和set回调函数
```tsx
function App() {

  // int useState
  const [count, setCount] = useState<number>(0);

  const setCountWithValue = () => {
    // setCount是异步操作，且会通过队列执行，如果是相同的操作，则会被去重
    setCount(count + 1)
    setCount(count + 1)
  }

  const setCountWithCallback = () => {
    // 使用回调函数，则不会被去重，每次执行都会拿到当前的最新值
    setCount((current) => current + 1)
    setCount((current) => current + 1)
  }

  return (
    <>
      <div className="card">
        <button onClick={setCountWithValue}>
          count is {count} with set value
        </button>
      </div>
      <div className="gradient-divider"></div>

      <div className="card">
        <button onClick={setCountWithCallback}>
          count is {count} with set callback
        </button>
      </div>
    </>
  )
}
export default App
```

## 2. 对象(数组)
```tsx
function App() {

  // array useState
  // 修改原数组，如push，不会触发状态更新；
  // useState是浅比较，比较引用，对象不变化，则不触发更新
  const [customArray, setCusotmArray] = useState<number[]>([1]);

  // object useState
  // 你需要返回新的对象，否则不会触发更新
  // 如果要修改部分值，可考虑：解构、Object.assign()
  const [formData, setFormData] = useState<{ username: string, email: string }>({ username: 'hi', email: 'hi@gmail.com' });

  return (
    <>
      <div className="card">
        <button onClick={() => setCusotmArray([...customArray, customArray.length + 1])}>push element</button>
        <button onClick={() => setCusotmArray([1])}>clear element</button>
        <p>{customArray.map((item, index) => index === 0 ? item : "," + item)}</p>
      </div>

      <Form username={formData.username} email={formData.email} onChange={setFormData} />
    </>
  )
}
export default App
```

# 06-react-hook-useEffect

通过实现一个监听滚动条来从服务端加载数据流的组件，学习useEffect
1. 信息流组件容器实现；
2. 组件初始化时，获取第一批数据；
3. 监听滚动条，当滚动条接近底部时，加载下一批数据；

## 1. 组件实现
```tsx
export const InfiniteScrollFeed: React.FC = () => {

    // 数据源
    const [data, setData] = useState<FeedItem[]>([]);

    // 是否正在加载数据
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 信息流所在的dom节点
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="h-screen flex items-center justify-center">
            <div
                ref={scrollContainerRef}
                className="w-1/2 h-3/4 overflow-y-auto border-2 border-gray-300 rounded-lg p-4">
                {
                    data.map((item) => (
                        <FeedCard feedItem={item} key={item.id} />
                    ))
                }
                {isLoading && <div>Loading...</div>}
            </div>
        </div>
    )
}
```
模拟数据API，设定数据延迟，随机生成数据
```tsx
export const DataService = {
    async fetchData(cursor: number, pageSize: number): Promise<FeedItem[]> {
        console.log(cursor, pageSize);

        const delay = Math.floor(Math.random() * 1000) + 1000; // 1000ms 到 2000ms 之间的随机延迟
        await new Promise(resolve => setTimeout(resolve, delay));

        // 随机生成Feed
        const randomFeed = []
        for (let i = 0; i < pageSize; i++) {
            randomFeed.push({ id: cursor + 1, content: `Learn React useEffect Feed ${cursor++}` })
        }

        // 模拟游标分页
        return randomFeed;
    },
}
```

## 2. 使用useEffect完成数据的初始化

直接进行setData，在生产环境中useEffect在组件挂载时仅执行一次是没有问题，但是严格模式下，useEffect会被多次测试，setData并不是严格幂等的

```tsx
export const InfiniteScrollFeed: React.FC = () => {

    // 数据源
    const [data, setData] = useState<FeedItem[]>([]);

    // 是否正在加载数据
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 信息流所在的dom节点
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        DataService.fetchData(0, 10).then((extraData) => {
            // setData((current) => [...current, ...extraData]);  ❌
            loadData(extraData)  
        });
    }, []);

    const loadData = (extraData: FeedItem[]) => {
        setData((current) => {
            if (!extraData || extraData.length === 0) return current;
            if (!current || current.length === 0) return extraData;
            if (extraData[0].id <= current[current.length - 1].id) {
                return current;
            }
            return [...current, ...extraData];
        });
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div
                ref={scrollContainerRef}
                className="w-1/2 h-3/4 overflow-y-auto border-2 border-gray-300 rounded-lg p-4">
                {
                    data.map((item) => (
                        <FeedCard feedItem={item} key={item.id} />
                    ))
                }
                {isLoading && <div>Loading...</div>}
            </div>
        </div>
    )
}
```
## 3. 注册滚动监听器
```tsx
// 监听滚动事件, 滚动到底部时加载更多数据
useEffect(() => {
    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const { scrollTop, clientHeight, scrollHeight } = container;

        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            setIsLoading(true);
            const cursor = data ? data[data.length - 1].id : 0;
            DataService.fetchData(cursor, 5)
                .then((extraData) => {
                    loadData(extraData)
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                    setIsLoading(false);
                });
        }
    };

    scrollContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
        scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
}, [isLoading, data]);
```

# useMemo useCallback

