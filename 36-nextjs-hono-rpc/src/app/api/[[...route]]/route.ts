import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

// 将Next.js的所有route handler 由Hono处理
const app = new Hono().basePath('/api')

app
    .get('/', (c) => {
        return c.json({
            message: 'Hello Next.js and Vercel!',
        })
    })
    .get('/post/:id', zValidator("param", z.object({ id: z.coerce.number() })), (c) => {
        const id = c.req.param('id');
        return c.text(`Hello Post ${id}!`)
    })
    .post('/post/create', (c) => {
        return c.text('POST')
    })

// 暴露GET、POST
export const GET = handle(app)
export const POST = handle(app)