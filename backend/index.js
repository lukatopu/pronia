import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ProductsRouter from './routes/productRoutes.js'
import UsersRouter from './routes/userRoutes.js'
import connectDB from './db/connection.js'
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import compression from 'compression';
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import { URL } from 'url'
import path from 'path'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


connectDB(process.env.CONNECTION_STRING)

// const limiter = rateLimit({
//  windowMs: 5 * 60 * 1000,
//  max: 1000,
//  message: "Too many requests from this IP, please try again later"
// })
// app.use(limiter)


app.use(cors({
 origin: (origin, callback) => {
  callback(null, origin || '*');
 },
 credentials: true
}));


app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "*"],
      mediaSrc: ["'self'", "*"],
      imgSrc: ["'self'", "*", "data:"],  // note: no quotes around data: here
      connectSrc: ["'self'", "*"],
      scriptSrc: ["'self'", "*"],
    } 
  }
}));
app.use(express.json())
app.use(cookieParser());
app.use(compression())


app.use('/api/products', ProductsRouter)
app.use('/api/users', UsersRouter)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(PORT, () => {
 console.log(`server listening on port ${PORT}`)
})