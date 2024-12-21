import { Hono } from "hono";
import { getPostById, createPost, updatePost, deletePost } from '@/lib/datasource';

const app = new Hono()
    .get("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const post = await getPostById(id);
        return c.json(post);
    })
    .post("", async (c) => {
        const request = await c.req.json();
        const createRequest = {
            title: request.title,
            content: request.content,
            tags: request.tags,
            category: request.category,
            published: request.published,
            author: request.author,
        };
        const post = await createPost(createRequest);
        return c.json(post);
    })
    .patch("/:id", async (c) => {
        const id = c.req.param("id");
        const request = await c.req.json();
        const updateUpdate = {
            id: Number(id),
            title: request.title,
            content: request.content,
            tags: request.tags,
            category: request.category,
            published: request.published,
            author: request.author,
        };
        const post = await updatePost(updateUpdate);
        return c.json(post);
    })
    .delete("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const post = await deletePost(id);
        return c.json(post);
    });

export default app;
