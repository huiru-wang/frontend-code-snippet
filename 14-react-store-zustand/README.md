# 11-react-store-zustand

Zustand 是一个轻量级的状态管理库，适用于 React 应用。它简单易用，提供了灵活的状态管理方案；

## 项目结构
```
14-react-store-zustand/
├── src/
│   ├── store/
│   │   └── store.ts
│   └── App.tsx
└── README.md
```

引入zustand
```shell
pnpm add zustand
```

## 创建store

定义一个store的接口；

使用`create`函数创建一个store，实现接口，返回一个函数；
```ts
import { create } from 'zustand';

// 定义 store 的状态接口
interface BearState {
    bears: number;
    nuts: number;
    increaseBears: () => void;
    removeBears: () => void;
}

// 创建 store
const useBearStore = create<BearState>((set) => ({
    bears: 0,
    nuts: 10,
    increaseBears: () => set((state: BearState) => ({ bears: state.bears + 1 })),
    removeBears: () => set({ bears: 0 }),
}));

export default useBearStore;
```


## 使用store

在 src/App.tsx 文件中，我们使用 useBearStore hook 来访问和更新 store 中的状态。
```tsx
import { useEffect, useState } from "react";
import useBearStore from "./store/store";

function App() {
  // 解构引入zustand store
  const { bears, increaseBears, removeBears } = useBearStore();

  // 单独引入指定的状态
  const nuts = useBearStore((state) => state.nuts);

  return (
    <div className="flex flex-col items-center gap-4">

      <h1>
        {bears} bears around here. with {nuts} nuts
      </h1>

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
  );
}
export default App;
```