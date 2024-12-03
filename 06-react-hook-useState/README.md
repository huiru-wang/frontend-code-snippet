# 02-react-basic

## useState

`useState`是React Hooks中的一个基础Hook，用于在函数组件中添加状态。它允许函数组件拥有和管理自己的状态，就像类组件中的`this.state`一样

```tsx
const [count, setCount] = useState(0);
```
- count：状态；
- setCount：更新状态的函数；
- 传入初始值0

例子：
```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
```
```tsx
// src/App.tsx
import { useState } from 'react'

function App() {
    // int useState，初始化count为0
    const [count1, setCount1] = useState<number>(0);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <button
                    className='border-solid border-2 border-gray-200 bg-red-300 p-2'
                    onClick={() => setCount1(count1 + 1)}>
                    Click Count {count1}
                </button>
            </div>
        </div>
    )
}
export default App
```

### 异步更新

```tsx
// src/App.tsx
import { useState } from 'react'

function App() {
    // int useState，初始化count为0
    const [count1, setCount1] = useState<number>(0);
    const [count2, setCount2] = useState<number>(0);
    const [count3, setCount3] = useState<number>(0);

    const setCountWithValue = () => {
        // setCount是异步操作，且会通过队列执行，如果是相同的操作，则会被去重
        setCount2(count2 + 1)
        setCount2(count2 + 1)
    }

    const setCountWithCallback = () => {
        // 使用回调函数，则不会被去重，每次执行都会拿到当前的最新值
        setCount3((current) => current + 1)
        setCount3((current) => current + 1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <button
                    className='border-solid border-2 border-gray-200 bg-red-300 p-2'
                    onClick={() => setCount1(count1 + 1)}>
                    Click Count {count1}
                </button>
            </div>

            <div >
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={setCountWithValue}>
                    Click and Set two times : {count2}
                </button>
            </div>

            <div >
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={setCountWithCallback}>
                    Click and Set two times : {count3}
                </button>
            </div>
        </div>
    )
}
export default App
```


### 浅比较

```tsx
import { useState } from 'react'

function App() {
    /**
     * 浅比较，更新数组、对象
     */
    const [customArray, setCusotmArray] = useState<number[]>([1]);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                {/* 
                []: 创建新数组
                [...customArray, element]: 将原数组解构放入新数组，并增加一个新元素，触发更新 
                */}
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={() => setCusotmArray([...customArray, customArray.length + 1])}
                >
                    push elemen
                </button>
                <button
                    className="border-solid border-2 border-gray-200 bg-red-300 p-2"
                    onClick={() => setCusotmArray([1])}
                >
                    clear element
                </button>
                <p className='border-solid border-2 border-gray-200'>
                    {customArray.map((item, index) => index === 0 ? item : "," + item)}
                </p>
            </div>
        </div>
    )
}
export default App
```
setState通过比对state的引用地址，来判断是否需要更新，如果引用地址没有变化，则不会更新，如果引用地址发生了变化，则需要更新；

因此每次更新数组和对象时，需要传入新的数组、对象，而不是直接修改原数组、对象，否则不会触发更新。

