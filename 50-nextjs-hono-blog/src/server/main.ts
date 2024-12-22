import { Hono } from 'hono';
import { cors } from "hono/cors";
import posts from './posts/api'
import { globalErrorHandler } from './error';

const app = new Hono()
app.use(
    "*",
    cors({
        origin: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    }),
);
app.use('*', globalErrorHandler);

app.route('/api/posts', posts);

type AppType = typeof app;
export { app, type AppType };