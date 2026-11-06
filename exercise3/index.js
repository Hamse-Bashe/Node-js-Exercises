import express from 'express'
const app = express();

// dotenv
import dotenv from 'dotenv'
dotenv.config()

// routes
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'

import mongoose from 'mongoose'; // mongoose
import { errorHandler } from './middlewares/errorHandler.js'; // error handler


app.use(express.json())
app.use("/auth", authRouter)
app.use("/admin", adminRouter)


// Global error handler
app.use(errorHandler)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("✅ MongoDb connected locally."))
    .catch((err)=> console.log(`❌ Connection error: ${err}`))

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
