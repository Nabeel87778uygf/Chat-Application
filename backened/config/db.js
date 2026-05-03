import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;

        // Check if MONGO_URI exists
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not set in environment variables");
        }

        // Connect to MongoDB
        const conn = await mongoose.connect(MONGO_URI);

        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(" Error connecting to MongoDB:", error.message);

        // Stop server if DB connection fails
        process.exit(1);
    }
};