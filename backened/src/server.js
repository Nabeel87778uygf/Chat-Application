import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js"
import { connectDB } from "../config/db.js";

dotenv.config();

// 👇 YAHAN LIKHO DEBUG LINE
console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

//Middleware
app.use(express.json());

const PORT = process.env.PORT || 4000;


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});