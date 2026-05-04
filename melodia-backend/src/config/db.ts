import mongoose from "mongoose";
import { env } from "./env";

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongoUri);

        // Confirm successful database connection
        console.log("MongoDB connected.");
    } catch (error) {
        // Exit process if DB connection fails (app cannot run without DB)
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
