import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ProductsRouter from './routes/productRoutes.js'
import UsersRouter from './routes/userRoutes.js'
import connectDB from './db/connection.js'
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import compression from 'compression';

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


connectDB(process.env.CONNECTION_STRING)

const limiter = rateLimit({
 windowMs: 5 * 60 * 1000,
 max: 100,
 message: "Too many requests from this IP, please try again later"
})
app.use(limiter)


app.use(cors({
 origin: (origin, callback) => {
  callback(null, origin || '*');
 },
 credentials: true
}));


app.use(helmet())
app.use(express.json())
app.use(compression())


app.use('/api/products', ProductsRouter)
app.use('/api/users', UsersRouter)

app.listen(PORT, () => {
 console.log(`server listening on port ${PORT}`)
})