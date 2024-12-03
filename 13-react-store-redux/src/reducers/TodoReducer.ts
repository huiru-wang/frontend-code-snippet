import { TodoItem } from './../constants/Types';
import { ADD_TODO, COMPLETE_TODO, DELETE_TODO } from '../constants/ActionTypes';

// 初始状态
const initialState: TodoItem[] = [
    { id: 1, text: "learn redux", completed: false }
];

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            const newTodo = {
                id: action.payload.id,
                text: action.payload.text || '', // 确保 text 不为 undefined
                completed: action.payload.completed || false
            };
            return [...state, newTodo];
        }
        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.payload.id ? {
                    ...todo,
                    completed: !todo.completed
                } : todo
            );
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload.id);
        default:
            return state;
    }
};

export default todoReducer;