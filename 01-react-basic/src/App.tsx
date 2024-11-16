import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { BlogList } from './pages/BlogList'
import { TagList } from './pages/TagList'
import { BlogPost } from './lib/types'
import { useState } from 'react'
import { blogPosts } from './lib/data'
import { About } from './pages/About'

const App: React.FC<{}> = () => {

  const [blogs, _] = useState<BlogPost[]>(blogPosts)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<BlogList blogs={blogs} />} />
          <Route path='/tags' element={<TagList blogs={blogs} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;