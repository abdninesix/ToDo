import express from "express"
import dotenv from "dotenv"
import connectDB from "./MongoDB.js"
import taskRouter from "./routes/task.router.js"
import bodyParser from "body-parser"
import cors from 'cors'

const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT || 8080

app.get('/', (req, res)=>{res.send("Sup dawg")})

app.use(cors())
app.use(bodyParser.json())
app.use ('/tasks', taskRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})