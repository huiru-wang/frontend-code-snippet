import { Hono } from 'hono'
import authors from './authors'
import books from './books'

const app = new Hono().basePath("api")

const routes = app.route('/authors', authors).route('/books', books)

export default app
export type AppType = typeof routes