import './App.css'
import { Layout } from './components/Layout'
import { ThemeProvider } from './contexts/ThemeProvider'

function App() {

  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider >
  )
}

export default App
