export type CreatePostRequest = {
    title: string;
    content: string;
    category: string;
    slug: string;
    keywords: string;
    description: string;
    published: boolean;
    author: string;
    tags: string[];
}

export type UpdatePostRequest = {
    id: number;
    title?: string;
    content?: string;
    category?: string;
    slug?: string;
    keywords?: string;
    description?: string;
    published?: boolean;
    author?: string;
    tags?: string[] | undefined;
}