import { Hono } from "hono";

const app = new Hono()
    .get("/:id", async (c) => {
        const data = `Get Post ${c.req.param("id")}`;
        return c.json({ sucess: true, data: data });
    })
    .post("", async (c) => {
        const request = await c.req.json();
        return c.json({ sucess: true, data: request });
    })
    .patch("/:id", async (c) => {
        const id = c.req.param("id");
        const request = await c.req.json();
        return c.json({ sucess: true, data: { id, request } });
    })
    .delete("/:id", async (c) => {
        const data = `Delete Post ${c.req.param("id")}`;
        return c.json({ sucess: true, data: data });
    });

export default app;
