# 03-react-route

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

## 1. 父子组件传递props
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

## 2. routes

1. 引入路由组件
```shell
pnpm add react-router-dom@6
```

2. 使用路由
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