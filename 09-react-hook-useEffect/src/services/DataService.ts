import { FeedItem } from "../lib/types";

export const DataService = {
    async fetchData(cursor: number, pageSize: number): Promise<FeedItem[]> {
        const delay = Math.floor(Math.random() * 1000) + 1000; // 1000ms 到 2000ms 之间的随机延迟
        await new Promise(resolve => setTimeout(resolve, delay));

        // 随机生成Feed
        const randomFeed = []
        for (let i = 0; i < pageSize; i++) {
            randomFeed.push({ id: cursor + 1, content: `Learn React useEffect Feed ${cursor++}` })
        }

        // 模拟游标分页
        return randomFeed;
    },
}
