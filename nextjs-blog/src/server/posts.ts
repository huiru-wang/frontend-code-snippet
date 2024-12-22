import { Hono } from "hono";
import { getPostById, createPost, updatePost, deletePost } from '@/lib/db';
import { postCreateSchema, postUpdateSchema } from "@/lib/schema/posts";

const app = new Hono()
    .get("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const post = await getPostById(id);
        return c.json(post);
    })
    .post("", async (c) => {
        const request = await c.req.json();
        const parsedCreateRequest = postCreateSchema.safeParse(request);
        if (!parsedCreateRequest.success) {
            return c.json({ error: parsedCreateRequest.error.errors }, 400);
        }
        const post = await createPost(parsedCreateRequest.data);
        return c.json(post);
    })
    .patch("", async (c) => {
        const request = await c.req.json();
        const parsedUpdateRequest = postUpdateSchema.safeParse(request);
        if (!parsedUpdateRequest.success) {
            return c.json({ error: parsedUpdateRequest.error.errors }, 400);
        }
        const post = await updatePost(parsedUpdateRequest.data);
        return c.json(post);
    })
    .delete("/:id", async (c) => {
        const id = Number(c.req.param("id"));
        const post = await deletePost(id);
        return c.json(post);
    });

export default app;
