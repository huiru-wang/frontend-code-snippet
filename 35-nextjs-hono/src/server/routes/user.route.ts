import { Hono } from 'hono';
import { getUserById, createUser } from '../controller/user.controller';

const userRoute = new Hono();

userRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const user = await getUserById(id);
    if (user) {
        return c.json(user);
    }
    return c.json({ message: 'User not found' }, 404);
});

userRoute.post('/', async (c) => {
    const userData = await c.req.json();
    const newUserId = await createUser(userData);
    return c.json({ message: 'User created successfully', id: newUserId });
});

export default userRoute;