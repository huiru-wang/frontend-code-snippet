import React, { useState, useMemo } from 'react';

const NumberList = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [newNumber, setNewNumber] = useState(0);

  // 计算总和的函数
  const calculateSum = () => {
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }
    return sum;
  };

  // 使用useMemo记忆计算结果
  const sum = useMemo(() => calculateSum(), [numbers]);

  const addNumber = () => {
    // 向列表中添加一个新数字
    setNumbers([...numbers, newNumber]);
  };

  return (
    <div>
      <h1>数字列表总和</h1>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
      <p>总和: {sum}</p>
      <input
        type="number"
        value={newNumber}
        onChange={(e) => setNewNumber(Number(e.target.value))}
      />
      <button onClick={addNumber}>添加数字</button>
    </div>
  );
};

export default NumberList;