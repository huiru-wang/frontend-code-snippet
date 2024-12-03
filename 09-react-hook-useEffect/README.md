# 09-react-hook-useEffect

```ts
useEffect(() => {
    // do something

    // clean up
    return (() => {})
}, [dependencies])
```
- 当dependencies变化时(浅比较)，执行回调函数；dependencies为空则组件初始化时执行一次；
- 谨防内存泄漏：如果回调函数涉及订阅事件、定时器等，使用return来返回一个回调函数，用于清理；


通过实现一个监听滚动条来从服务端加载数据流的组件，学习useEffect
1. 信息流组件容器实现；
2. 组件初始化时，获取第一批数据；
3. 监听滚动条，当滚动条接近底部时，加载下一批数据；

## 1. 组件实现
```tsx
export const InfiniteScrollFeed: React.FC = () => {

    // 数据源
    const [data, setData] = useState<FeedItem[]>([]);

    // 是否正在加载数据
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 信息流所在的dom节点
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="h-screen flex items-center justify-center">
            <div
                ref={scrollContainerRef}
                className="w-1/2 h-3/4 overflow-y-auto border-2 border-gray-300 rounded-lg p-4">
                {
                    data.map((item) => (
                        <FeedCard feedItem={item} key={item.id} />
                    ))
                }
                {isLoading && <div>Loading...</div>}
            </div>
        </div>
    )
}
```
模拟数据API，设定数据延迟，随机生成数据
```tsx
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
```

## 2. 使用useEffect完成数据的初始化

直接进行setData，在生产环境中useEffect在组件挂载时仅执行一次是没有问题，但是严格模式下，useEffect会被多次测试，setData并不是严格幂等的

```tsx
export const InfiniteScrollFeed: React.FC = () => {

    // 数据源
    const [data, setData] = useState<FeedItem[]>([]);

    // 是否正在加载数据
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 信息流所在的dom节点
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        DataService.fetchData(0, 10).then((extraData) => {
            // setData((current) => [...current, ...extraData]);  ❌
            loadData(extraData)  
        });
    }, []);

    const loadData = (extraData: FeedItem[]) => {
        setData((current) => {
            if (!extraData || extraData.length === 0) return current;
            if (!current || current.length === 0) return extraData;
            if (extraData[0].id <= current[current.length - 1].id) {
                return current;
            }
            return [...current, ...extraData];
        });
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div
                ref={scrollContainerRef}
                className="w-1/2 h-3/4 overflow-y-auto border-2 border-gray-300 rounded-lg p-4">
                {
                    data.map((item) => (
                        <FeedCard feedItem={item} key={item.id} />
                    ))
                }
                {isLoading && <div>Loading...</div>}
            </div>
        </div>
    )
}
```
## 3. 注册滚动监听器
```tsx
// 监听滚动事件, 滚动到底部时加载更多数据
useEffect(() => {
    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const { scrollTop, clientHeight, scrollHeight } = container;

        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            setIsLoading(true);
            const cursor = data ? data[data.length - 1].id : 0;
            DataService.fetchData(cursor, 5)
                .then((extraData) => {
                    loadData(extraData)
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                    setIsLoading(false);
                });
        }
    };

    scrollContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
        scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
}, [isLoading, data]);
```