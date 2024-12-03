import { create } from 'zustand'

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
}))

export default useBearStore;
