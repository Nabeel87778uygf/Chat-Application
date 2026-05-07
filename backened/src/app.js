import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
import path from "path"



const app = express();
// const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

export default app;