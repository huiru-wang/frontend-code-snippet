import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { BlogList } from './pages/BlogList'
import { TagList } from './pages/TagList'
import { BlogPost } from './lib/types'
import { blogPosts } from './lib/data'
import { About } from './pages/About'

const App: React.FC<{}> = () => {

  const [blogs, setBlogs] = useState<BlogPost[]>(blogPosts)

  const like = (id: number) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, like: blog.like + 1 }
      } else {
        return blog
      }
    }))
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<BlogList blogs={blogs} like={like} />} />
          <Route path='/tags' element={<TagList blogs={blogs} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;