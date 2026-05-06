import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "../config/db.js";
import { ENV } from "./lib/env.js";

dotenv.config();

const PORT = ENV.PORT || 4000;

console.log("JWT SECRET:", ENV.JWT_SECRET);

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectDB();
});