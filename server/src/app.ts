import express from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { myDataSource } from './app.data-source'
import 'dotenv/config'
import authRouter from './routes/auth.route'

const app = express()

// Allow all origins in development (Vite proxy will handle security in production)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-production-domain.com']
    : true // Allows all origins in dev
}));

app.use(express.json())
app.use(CookieParser())
app.use(express.urlencoded({extended:true}))
app.set('trust proxy', 1)

// API routes
app.use('/auth', authRouter)

myDataSource.initialize().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Started Express Server on Port: ${process.env.PORT}`)
    })
}).catch(error=> console.error("DBError: ", error))
