import { useEffect, useRef, useState } from 'react'
import '../App.css'
import { FeedItem } from '../lib/types';
import { DataService } from '../services/DataService';
import { FeedCard } from './FeedCard';

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
 * 
 * Effect 描述了如何将外部系统与当前的 props 和 state 同步
 * 
 * useEffect lifecycle :
 * https://react.dev/learn/lifecycle-of-reactive-effects
 * https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects
 */

export const InfiniteScrollFeed: React.FC = () => {

    // 数据源
    const [data, setData] = useState<FeedItem[]>([]);

    // 是否正在加载数据
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 信息流所在的dom节点
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    // 初始化数据流，依赖的数据为空，只会在组件挂载完成时执行一次
    // 严格模式下会多次触发useEffect，以确保useEffect是幂等的
    // 因此loadData函数必须是多次执行总是返回正确的结果
    useEffect(() => {
        DataService.fetchData(0, 10).then((extraData) => {
            // setData((current) => [...current, ...extraData]) ❌
            loadData(extraData)
        });
    }, []);

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