import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRoute from './routes/user.route';
import postRoute from './routes/post.route';
import { connectDB } from './config/db';

const app = new Hono();

// 挂载用户路由
app.route('/api/users', userRoute);
// 文章相关路由
app.route('/api/posts', postRoute);

// 启动服务
(async () => {
    await connectDB();
    console.log('Server started on port 3000');
    serve({
        fetch: app.fetch,
        port: 8080,
    });
})().catch((error) => {
    console.error('Failed to start server:', error);
});