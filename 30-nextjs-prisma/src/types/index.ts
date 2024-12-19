export type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    tags: string[];
    category: string;
    content: string;
    published: boolean;
    author: string;
}

export type CreatePostRequest = {
    title: string;
    tags: string[];
    category: string;
    content: string;
    published?: boolean;
    author: string;
}