// App.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState, TodoDispatch } from './store/store';
import { addTodo, deleteTodo, toggleTodo } from './actions/TodoAction';
import { useState } from 'react';

function App() {

  // 从Redux store 读取指定的todos ，如果有别的state，则选择对应的state即可
  // 当state发生变化，会重新渲染组件
  const todos = useSelector((state: RootState) => state.todos);

  // 获取 dispatch 函数，通过dispatch触发特定的Action，执行特定的reducer，从而触发state变更
  const todoDispatch = useDispatch<TodoDispatch>();

  const [inputValue, setInputValue] = useState('');

  // 通过dispatch 调用 addTodo action
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      todoDispatch(addTodo(inputValue));
      setInputValue('');
    } else {
      alert('Please enter a task.');
    }
  };

  // 通过dispatch 调用 deleteTodo action
  const handleDeleteTodo = (id: number) => {
    todoDispatch(deleteTodo(id));
  };

  // 通过dispatch 调用 toggleTodo action
  const handleToggleTodo = (id: number) => {
    todoDispatch(toggleTodo(id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='bg-slate-300 rounded-lg shadow-md p-6 w-full max-w-md overflow-hidden'> {/* 添加 overflow-hidden */}
        <h1 className='text-red-500 text-3xl mb-4'>Todos</h1>

        <div className='mb-4'>
          <input
            className='border-2 border-gray-300 h-10 w-full pr-4 pl-2 rounded focus:outline-none focus:border-blue-500'
            placeholder='What needs to be done?'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className='flex flex-col justify-center'>
          {
            todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className='flex items-center justify-between mb-2'>
                  <div className='flex items-center'>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className='mr-2'
                    />
                    <span
                      className={`text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    className='text-red-500 hover:text-red-600 focus:outline-none'
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-center'>No todos yet. Add one above!</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;