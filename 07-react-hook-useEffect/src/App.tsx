import './App.css'
import { TodoList } from './components/TodoList'

/**
 * useEffect
 * 1. 声明useEffect
 * 2. 指定effect的依赖项；
 * 3. 按需添加cleanup清理函数
 * 
 * 适用场景：
 * 1  useEffect仅用于与外部系统交互、数据同步等操作，如果仅仅是内部的状态调整、同步、渲染，不要使用useEffect
 * 2. 它可能很慢，这是不可预估的
 * 3. 它可能出错，这也是不可预测的。
 */
function App() {

  return (
    <>
      <TodoList />
    </>
  )
}

export default App
