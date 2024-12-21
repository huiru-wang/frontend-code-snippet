import { Hono } from 'hono';
import { cors } from "hono/cors";
import posts from './posts';

const app = new Hono().basePath("api")
app.use(
    "*",
    cors({
        origin: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
        allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    }),
);

app.route("/posts", posts);

export default app;