import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";



const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;