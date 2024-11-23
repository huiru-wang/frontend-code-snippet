import { posts } from "./data";
import type { Post } from "./types";

export const ApiService = {
    async fetchPosts(id: string): Promise<Post | null> {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!/^\d+$/.test(id)) {
                return null;
            }
            const idNum = parseInt(id);
            const post = posts.find(post => post.id === idNum);
            if (post) {
                return post;
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        return null;
    },
}

