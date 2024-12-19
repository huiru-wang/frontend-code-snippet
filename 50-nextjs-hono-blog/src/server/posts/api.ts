import { Hono } from "hono";
import { getPostById, createPost, updatePost, deletePost } from './service';

const app = new Hono()
    .get("/:id", async (c) => {
        const serviceResult = await getPostById(c.req.param("id"));
        return c.json(serviceResult);
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
        const serviceResult = await createPost(createRequest);
        return c.json(serviceResult);
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
        const serviceResult = await updatePost(updateUpdate);
        return c.json(serviceResult);
    })
    .delete("/:id", async (c) => {
        const id = c.req.param("id");
        const serviceResult = await deletePost(id);
        return c.json(serviceResult);
    });

export default app;
