import React, { useEffect, useState } from "react";
import { TodoItem } from "../lib/types";
import { TodoService } from "../services/todoService";
import '../App.css'
import { ItemList } from "./ItemList";

/**
 * useEffect
 * 1. 声明useEffect
 * 2. 指定effect的依赖项；
 * 3. 按需添加cleanup清理函数
 * 
 * 适用场景：
 * 1  useEffect仅用于与外部系统交互、数据同步等操作，如果仅仅是内部的状态调整、同步、渲染，不要使用useEffect
 * 2. 它可能很慢，这是不可预估的
 * 3. 它可能出错，这也是不可预测的。
 */

export const TodoList: React.FC = () => {

    const [todoList, setTodoList] = useState<TodoItem[]>([])

    const [unCompletedTodos, setUnCompletedTodos] = useState<TodoItem[]>([])

    const [submitLoading, setSubmitLoading] = useState(false)

    const [isShowAll, setIsShowAll] = useState(true)

    /**
     * 外部系统数据同步
     */
    useEffect(() => {
        TodoService.fetchTodoList().then(data => {
            setTodoList(data)
            const unCompletedItems = data.filter(item => !item.completed)
            setUnCompletedTodos(unCompletedItems)
        }).catch(error => {
            console.error("Failed to fetch todo list:", error);
        })
    }, [])

    /**
     * 添加待办事项到服务端，成功后加入列表
     * @param e 提交事件
     */
    const addTodoItem = (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement = e.target as HTMLFormElement;
        const content: string = (inputElement.elements[0] as HTMLInputElement).value;
        if (content && content.length > 0 && content.length <= 100) {
            setSubmitLoading(true)
            TodoService.addTodoItem(content).then(data => {
                setTodoList([...todoList, data])
                setUnCompletedTodos([...unCompletedTodos, data])
                setSubmitLoading(false)
            })
        }
    }

    /**
     * 切换待办事项状态 
     * @param id id
     */
    const checkTodoItem = (id: number) => {
        const updatedTodoList = todoList.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setTodoList(updatedTodoList);
        const unCompletedItems = updatedTodoList.filter(item => !item.completed);
        setUnCompletedTodos(unCompletedItems)
    }

    return (
        <div className="todo-container">

            <div className="add-todo">
                <form onSubmit={addTodoItem}>
                    <input className="add-todo-input" type="text" placeholder="Add Todo" />
                    <button type="submit" disabled={submitLoading}>Add</button>
                </form>
                <button type="submit" onClick={() => setIsShowAll(!isShowAll)}>
                    {isShowAll ? "UnCompletedItems" : "showAllItems"}
                </button>
            </div>

            {
                isShowAll ?
                    <ItemList todoItemList={todoList} checkTodoItem={checkTodoItem} />
                    :
                    <ItemList todoItemList={unCompletedTodos} checkTodoItem={checkTodoItem} />
            }

        </div>

    )
}