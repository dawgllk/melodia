import { Router } from "express";
import {
    getLikedSongStatus,
    getLikedSongs,
    likeSong,
    unlikeSong
} from "../controllers/like.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/likes", authenticateToken, likeSong);
router.get("/likes", authenticateToken, getLikedSongs);
router.get("/likes/:spotifyTrackId/status", authenticateToken, getLikedSongStatus);
router.delete("/likes/:spotifyTrackId", authenticateToken, unlikeSong);

export default router;