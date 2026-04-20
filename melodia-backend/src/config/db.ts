import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is missing in the .env file.");
    }

    try {
        await mongoose.connect(mongoUri);

        // Confirm successful database connection
        console.log("MongoDB connected.");
    } catch (error) {
        // Exit process if DB connection fails (app cannot run without DB)
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};