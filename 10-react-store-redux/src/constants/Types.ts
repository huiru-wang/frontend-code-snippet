
export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoAction {
    type: string;
    payload: {
        id: number;
        text?: string;
        completed?: boolean;
    };
}