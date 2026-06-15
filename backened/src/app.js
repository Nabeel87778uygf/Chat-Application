import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
import path from "path"
import cors from "cors";


const app = express();
// const __dirname = path.resolve();


app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], credentials: true }));
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

export default app;