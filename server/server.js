import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;

const app = express()

app.use(express.json())
app.use(cors())
connectDB()


// routes
app.use('/api/user', userRoutes)
app.use('/api/image', imageRouter)





app.get('/', (req, res) => res.send("Api Working fine"))
const startServer = async () => {
  try {
    // await connectDB()
    app.listen(PORT, () => {
      console.log("🚀 Server Running on port: " + PORT)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error)
  }
}

startServer()