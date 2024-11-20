

export function fetchData() {
    try {
        // 模拟1s延迟
        new Promise((resolve) => setTimeout(resolve, 1000));
        return {};
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {};
    }
}