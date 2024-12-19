import './App.css'
import { Card } from './Card'
import { blogs } from './lib/data'

function App() {

  return (
    <div>
      {/* Header */}
      <div className='bg-slate-400 mb-8'>
        <h1>Blog</h1>
      </div>

      {/* Main */}
      <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-8 ml-6 mr-6'>
        {
          blogs.map(blog => <Card blog={blog} />)
        }
      </div>

      {/* Footer */}
      <div className='bg-slate-400 mt-8'>
        <h1>Footer</h1>
      </div>
    </div>
  )
}

export default App
