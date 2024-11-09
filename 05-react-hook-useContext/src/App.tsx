import './App.css'
import { Layout } from './components/Layout'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

export default App
