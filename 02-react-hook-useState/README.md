# 02-react-hook-useState

useState的2个关键点
1. set值和set回调函数的区别
2. state为对象(数组)时，返回新的引用，而不是在原有的对象(数组)上修改

## 1.set值和set回调函数
```tsx
function App() {

  // int useState
  const [count, setCount] = useState<number>(0);

  const setCountWithValue = () => {
    // setCount是异步操作，且会通过队列执行，如果是相同的操作，则会被去重
    setCount(count + 1)
    setCount(count + 1)
  }

  const setCountWithCallback = () => {
    // 使用回调函数，则不会被去重，每次执行都会拿到当前的最新值
    setCount((current) => current + 1)
    setCount((current) => current + 1)
  }

  return (
    <>
      <div className="card">
        <button onClick={setCountWithValue}>
          count is {count} with set value
        </button>
      </div>
      <div className="gradient-divider"></div>

      <div className="card">
        <button onClick={setCountWithCallback}>
          count is {count} with set callback
        </button>
      </div>
    </>
  )
}
export default App
```

## 2. 对象(数组)
```tsx
function App() {

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
        <button onClick={() => setCusotmArray([...customArray, customArray.length + 1])}>push element</button>
        <button onClick={() => setCusotmArray([1])}>clear element</button>
        <p>{customArray.map((item, index) => index === 0 ? item : "," + item)}</p>
      </div>

      <Form username={formData.username} email={formData.email} onChange={setFormData} />
    </>
  )
}
export default App
```
