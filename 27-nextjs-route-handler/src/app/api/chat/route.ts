import { NextRequest, NextResponse } from 'next/server';
import { ReadableStream } from 'node:stream/web';

/**
 * Streaming 流式数据处理 ??? 有问题
 */
export async function POST(request: NextRequest) {

    // 这里可以获取POST请求体中的数据进行处理，例如简单打印一下请求体内容（实际可能会根据数据做更复杂操作）
    const requestData = request.body;
    console.log('Received POST data:', requestData);

    const iterator = fetchData();
    const stream = getStream(iterator);

    return new NextResponse(stream as unknown as BodyInit, {
        headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        }
    });
}

/**
 * 创建一个流，传入迭代器，流的回调函数不断处理迭代器的数据
 */
function getStream(iterator: AsyncGenerator<string>) {
    return new ReadableStream({
        async pull(controller) {

            const { value, done } = await iterator.next();

            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        }
    })
}

/**
 * 生成器函数：暂停自身的执行并在之后恢复，允许在函数内部多次产生值
 * yield：生成一个值，并暂停函数执行
 */
async function* fetchData() {
    const currentTime = new Date();
    yield `Hello! The current time is ${currentTime.toLocaleTimeString()}. \n`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield `After one second, it's still an exciting moment at ${new Date().toLocaleTimeString()}. \n`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield `Another second passed, and now it's ${new Date().toLocaleTimeString()} and we're still going! \n`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield `Time keeps ticking, and now it's ${new Date().toLocaleTimeString()}, enjoy the journey! \n`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield `Finally, as of ${new Date().toLocaleTimeString()}, we're nearing the end of this little time-based showcase. \n`;
}