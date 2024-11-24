import { Hono } from 'hono';
import { getPostById } from '../controller/post.controller';

const postRoute = new Hono();

postRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const post = await getPostById(id);
    if (post) {
        return c.json(post);
    }
    return c.json({ message: 'post not found' }, 404);
});

export default postRoute;