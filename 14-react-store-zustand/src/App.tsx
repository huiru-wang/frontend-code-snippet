import { useEffect, useState } from "react";
import useBearStore from "./store/store";

function App() {

  // 解构引入zustand store
  const { bears, increaseBears, removeBears } = useBearStore();

  // 单独引入指定的状态
  const nuts = useBearStore((state) => state.nuts);

  const [blink, setBlink] = useState(false);

  useEffect(() => {
    setBlink(true);
    const intervalId = setInterval(() => {
      setBlink(false);
    }, 100);
    return () => clearInterval(intervalId);
  }, [bears]);

  return (
    <div className="flex flex-col items-center gap-4">

      <div className="flex items-center justify-around">
        <h1
          className={`inline-block mr-2 text-xl ${blink ? 'opacity-20 text-orange-100' : 'opacity-80 text-gray-200'} transition-opacity duration-100 ease-in-out`}
        >
          {bears}
        </h1>
        bears around here. with
        <h1 className="text-orange-400 m-2"
        >
          {nuts}
        </h1>
        nuts
      </div>

      <button
        className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-36 mt-8"
        onClick={increaseBears}
      >
        one up bear
      </button>

      <button
        className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-48 mt-8"
        onClick={removeBears}
      >
        remove all bear
      </button>

    </div>
  )
}

export default App
