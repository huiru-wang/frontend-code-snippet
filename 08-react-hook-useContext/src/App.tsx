import './App.css'
import { Layout } from './components/Layout'
import { ThemeProvider } from './contexts/ThemeProvider'

function App() {

  return (
    // 3. 为子组件提供 theme context
    <ThemeProvider>
      <Layout />
    </ThemeProvider >
  )
}

export default App
