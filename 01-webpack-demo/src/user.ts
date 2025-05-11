type User = {
    id: number;
    name: string;
};

const userList = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
];

export function getUserList(): User[] {
    return userList;
}