import { todoItemData } from "../lib/data"
import { TodoItem } from "../lib/types";

export const TodoService = {
    async fetchTodoList(): Promise<TodoItem[]> {
        const delay = Math.floor(Math.random() * 500) + 500; // 500ms 到 1000ms 之间的随机延迟
        await new Promise(resolve => setTimeout(resolve, delay));
        return todoItemData;
    },

    async addTodoItem(content: string): Promise<TodoItem> {
        const delay = Math.floor(Math.random() * 500) + 500; // 500ms 到 1000ms 之间的随机延迟
        await new Promise(resolve => setTimeout(resolve, delay));
        const newItem = {
            id: todoItemData.length + 1,
            content,
            completed: false,
        }
        todoItemData.push(newItem);
        return newItem;
    }
}
