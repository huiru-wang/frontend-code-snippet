
# Async

## Event Loop




## Promise

Promise 是一个对象，用于表示一个异步操作的最终完成或失败。

Promise 有三种状态：`pending`、fulfilled 和 rejected。

Promise 的构造函数接收一个函数作为参数，该函数接收两个参数：resolve 和 reject。resolve 和 reject 是两个函数，分别表示异步操作成功和失败时的回调函数。

Promise 的 then 方法接收两个参数：onFulfilled 和 onRejected。onFulfilled 和 onRejected 是两个函数，分别表示异步操作成功和失败时的回调函数。
