import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
import { contactRouter } from './routes/contact-us'

const app = new Hono()

app.use('/*', cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)
app.route('/api/v1/contact-us', contactRouter)

export default app
