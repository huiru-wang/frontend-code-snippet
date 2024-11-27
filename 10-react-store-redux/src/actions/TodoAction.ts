import { ADD_TODO, COMPLETE_TODO, DELETE_TODO } from '../constants/ActionTypes';

// 创建添加待办事项的 action
export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: {
        id: Date.now(),
        text,
        completed: false
    }
});

// 创建切换待办事项完成状态的 action
export const toggleTodo = (id: number) => ({
    type: COMPLETE_TODO,
    payload: {
        id,
        completed: false
    }
});

// 创建删除待办事项的 action
export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: {
        id
    }
});