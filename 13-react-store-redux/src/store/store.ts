import todoReducer from '../reducers/TodoReducer';
import { configureStore } from '@reduxjs/toolkit';

// 创建Redux store，传入reducer，这里的类型会根据reducer自动推断
const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

// 导出根状态类型，方便后续在组件中使用
export type TodoDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;