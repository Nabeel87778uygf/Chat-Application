import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js"
import { connectDB } from "../config/db.js";
import { ENV } from './lib/env.js'


dotenv.config();

//  DEBUG LINE
// console.log("JWT SECRET:", process.env.JWT_SECRET);
console.log("JWT SECRET:", ENV.JWT_SECRET);

const app = express();

//Middleware
app.use(express.json());   //req.body

// const PORT = process.env.PORT || 4000;
const PORT = ENV.PORT || 4000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});