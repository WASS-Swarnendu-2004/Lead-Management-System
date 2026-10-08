import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dns from "dns"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import leadRouter from "./routes/leadRoutes.js"

dotenv.config()
dns.setServers(["8.8.8.8"])

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/leads",leadRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`);
});