import { fail } from "@/util/result";

// 全局异常处理中间件函数
export const globalErrorHandler = async (c, next) => {
    try {
        // 调用下一个中间件或者路由处理函数
        await next();
    } catch (error) {
        // 在这里统一处理各种异常
        console.error('全局异常捕获:', error);
        // 根据不同的错误类型可以返回不同的状态码和错误信息，这里简单返回 500 状态码和通用错误消息
        return c.json(fail(500, "Interval Server Error"))
    }
};