import express from 'express'
import dotenv from 'dotenv'
import UserRouter from './routes/user.routes.js'
import BookRouter from './routes/book.route.js'
import favouritesRouter from './routes/favouurites.route.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import cors from 'cors'
dotenv.config()
const app =express()
app.use(cors())
app.use(express.json())
app.use('/api/v1',UserRouter)
app.use('/api/v1',BookRouter)
app.use('/api/v1',favouritesRouter)
app.use('/api/v1',cartRouter)
app.use('/api/v1',orderRouter)
export default app
