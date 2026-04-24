import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.routes";
import authRoutes from "./routes/auth.routes";
import likeRoutes from "./routes/like.routes";
import discoverRoutes from "./routes/discover.routes";
import { connectToDatabase } from "./config/db";

/**
 * Load environment variables from the .env file into process.env.
 */
dotenv.config();

/**
 * Express application instance.
 */
const app = express();

/**
 * Port on which the server will run.
 *
 * Falls back to 3000 if not defined in environment variables.
 */
const PORT = process.env.PORT || 3000;

/**
 * Enable Cross-Origin Resource Sharing (CORS).
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON request bodies.
 */
app.use(express.json());

/**
 * Basic health check route.
 *
 * Can be used to verify that the API is running.
 *
 * @route GET /
 */
app.get("/", (_req, res) => {
    res.send("Melodia API is running");
});

/**
 * Register API route modules under the /api prefix.
 */
app.use("/api", searchRoutes);
app.use("/api", authRoutes);
app.use("/api", likeRoutes);
app.use("/api", discoverRoutes);

/**
 * Starts the Express server.
 *
 * Establishes a database connection before listening for requests.
 *
 * @returns Promise resolving when the server is started.
 */
const startServer = async (): Promise<void> => {
    await connectToDatabase();

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};

/**
 * Initialize server startup and handle startup errors.
 */
startServer().catch((error) => {
    console.error("Failed to start server:", error);
});