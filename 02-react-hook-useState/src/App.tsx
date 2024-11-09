import { useState } from 'react'
import './App.css'
import { Input } from './components/Input';
import { Switch } from './components/Swtich';
import { Form } from './components/Form';

function App() {
  // int useState
  const [count, setCount] = useState<number>(0);

  // boolean useState
  const [check, setCheck] = useState<boolean>(true);

  // string useState
  const [inputValue, setInputValue] = useState<string>("hi 😶‍🌫️");

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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="gradient-divider"></div>

      <Switch checked={check} onChange={setCheck} />

      <div className="gradient-divider"></div>

      <Input value={inputValue} onChange={setInputValue} />

      <div className="gradient-divider"></div>

      <div className="card">
        {/* 
        []: 创建新数组
        [...customArray, element]: 将原数组解构放入新数组，并增加一个新元素，触发更新 
        */}
        <button onClick={() => setCusotmArray([...customArray, customArray.length + 1])}>push element</button>
        <button onClick={() => setCusotmArray([1])}>clear element</button>
        <p>{customArray.map((item, index) => index === 0 ? item : "," + item)}</p>
      </div>
      <div className="gradient-divider"></div>

      <Form username={formData.username} email={formData.email} onChange={setFormData} />
    </>
  )
}

export default App
