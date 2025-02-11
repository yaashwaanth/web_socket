import express  from "express"
import authRoles from "./src/routes/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./src/lib/db.js"
import cookieParser from "cookie-parser"
import messageRoutes from "./src/routes/message.route.js"
import cors from "cors"
import { app,server,io } from "./src/lib/socket.js"

dotenv.config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser()) // allow u to parse the cookie
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }

))

app.use("/api/auth",authRoles)
app.use("/api/messages",messageRoutes)




server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})