import { posts } from "./data";
import type { Post } from "./types";

export const ApiService = {
    async fetchPosts(id: string): Promise<Post> {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            if (!/^\d+$/.test(id)) {
                return { id: 0, title: 'not found', content: 'not found' };
            }
            const idNum = parseInt(id)
            const post = posts.find(post => post.id === idNum)
            if (post) {
                return post
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        return { id: 0, title: 'not found', content: 'not found' }
    },

    async mockDelay() {
        try {
            // 模拟1s延迟
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return {};
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return {};
        }
    }
}

