import { Router } from "express";
import {
    disconnectSpotify,
    getSpotifyStatus,
    loginWithSpotify,
    spotifyCallback
} from "../controllers/spotifyAuth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

/**
 * Router handling Spotify OAuth and connection state endpoints.
 */
const router = Router();

/**
 * Starts Spotify OAuth for the authenticated user.
 *
 * @route GET /spotify/login
 * @access Protected by app JWT supplied in header or query param
 */
router.get("/spotify/login", loginWithSpotify);

/**
 * Handles the callback from Spotify after OAuth authorization.
 *
 * @route GET /spotify/callback
 * @access Public callback verified by signed OAuth state
 */
router.get("/spotify/callback", spotifyCallback);

/**
 * Checks whether the authenticated user has Spotify connected.
 *
 * @route GET /spotify/status
 * @access Protected
 */
router.get("/spotify/status", authenticateToken, getSpotifyStatus);

/**
 * Disconnects Spotify for the authenticated user.
 *
 * @route DELETE /spotify/disconnect
 * @access Protected
 */
router.delete("/spotify/disconnect", authenticateToken, disconnectSpotify);

/**
 * Exported Spotify authentication router.
 */
export default router;
