import { TodoItem } from "../lib/types";

interface ItemListProps {
    todoItemList: TodoItem[];
    checkTodoItem: (id: number) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ todoItemList, checkTodoItem }) => {
    return (
        <div className="todo-list">
            {
                todoItemList.map(todoItem => {
                    const completed = todoItem.completed
                    return (
                        <div key={todoItem.id} className="todo-item">
                            <input type="checkbox" checked={completed} onChange={() => checkTodoItem(todoItem.id)} />
                            <span style={{ textDecoration: completed ? "line-through" : "none" }}>{todoItem.content}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}