import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.routes";
import authRoutes from "./routes/auth.routes";
import likeRoutes from "./routes/like.routes";
import discoverRoutes from "./routes/discover.routes";
import { connectToDatabase } from "./config/db";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/", (_req, res) => {
    res.send("Melodia API is running");
});

// Register API routes
app.use("/api", searchRoutes);
app.use("/api", authRoutes);
app.use("/api", likeRoutes);
app.use("/api", discoverRoutes);

const startServer = async (): Promise<void> => {
    await connectToDatabase();

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
});