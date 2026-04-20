import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.routes";
import authRoutes from "./routes/auth.routes";
import { connectToDatabase } from "./config/db";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Basic health check route
app.get("/", (_req, res) => {
    res.send("Melodia API is running");
});

// Register API routes
app.use("/api", searchRoutes);
app.use("/api", authRoutes);

// Initialize database connection and start server
const startServer = async (): Promise<void> => {
    await connectToDatabase();

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};

// Handle startup errors
startServer().catch((error) => {
    console.error("Failed to start server:", error);
});