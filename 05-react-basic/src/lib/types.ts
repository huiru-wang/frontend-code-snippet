

export interface BlogPost {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    content?: string;
    tags: string[];
    like: number;
}