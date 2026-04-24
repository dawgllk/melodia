import { Router } from "express";
import {
    getLikedSongStatus,
    getLikedSongs,
    likeSong,
    unlikeSong
} from "../controllers/like.controller";
import { authenticateToken } from "../middleware/auth.middleware";

/**
 * Router handling liked songs functionality.
 *
 * All routes are protected and require authentication.
 */
const router = Router();

/**
 * Likes a song for the authenticated user.
 *
 * @route POST /likes
 * @access Protected
 */
router.post("/likes", authenticateToken, likeSong);

/**
 * Retrieves all liked songs for the authenticated user.
 *
 * @route GET /likes
 * @access Protected
 */
router.get("/likes", authenticateToken, getLikedSongs);

/**
 * Checks if a specific song is liked by the authenticated user.
 *
 * @route GET /likes/:spotifyTrackId/status
 * @access Protected
 */
router.get("/likes/:spotifyTrackId/status", authenticateToken, getLikedSongStatus);

/**
 * Removes a liked song for the authenticated user.
 *
 * @route DELETE /likes/:spotifyTrackId
 * @access Protected
 */
router.delete("/likes/:spotifyTrackId", authenticateToken, unlikeSong);

/**
 * Exported likes router.
 */
export default router;