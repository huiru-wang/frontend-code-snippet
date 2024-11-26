
# 08-react-hook-useMemo

## React.useMemo()
```ts
const result = useMemo(() => {}, []);
```
useMemo = compute + dependencies

当依赖的值发生变化，会对每个依赖值和上一次执行的值进行浅比较
- 如果相同，则不会重新执行。
- 如果不相同，则重新执行函数，返回新的结果；

原理：JavaScript闭包；

目标：减少不必要的计算，提升计算性能、减少渲染次数；

## React.memo()



## 案例


