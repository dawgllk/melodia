import { Router } from "express";
import {
    getLikedSongs,
    likeSong,
    unlikeSong
} from "../controllers/like.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/likes", authenticateToken, likeSong);
router.get("/likes", authenticateToken, getLikedSongs);
router.delete("/likes/:spotifyTrackId", authenticateToken, unlikeSong);

export default router;