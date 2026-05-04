import mongoose from "mongoose";
import { env } from "./env";

/**
 * Connects the application to MongoDB using the validated environment config.
 *
 * The backend cannot operate without the database, so a failed connection
 * logs the error and exits the process.
 *
 * @returns Promise resolving when MongoDB connection is established.
 */
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
