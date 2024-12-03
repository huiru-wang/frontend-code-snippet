import { useState } from 'react'

function App() {

    // int useState
    const [count1, setCount1] = useState<number>(0);

    /**
     * 异步更新
     */
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

    /**
     * 浅比较，更新数组、对象
     */
    const [customArray, setCusotmArray] = useState<number[]>([1]);

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
