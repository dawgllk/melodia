import { Router } from "express";
import {
    disconnectSpotify,
    getSpotifyStatus,
    loginWithSpotify,
    spotifyCallback
} from "../controllers/spotifyAuth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/spotify/login", loginWithSpotify);
router.get("/spotify/callback", spotifyCallback);
router.get("/spotify/status", authenticateToken, getSpotifyStatus);
router.delete("/spotify/disconnect", authenticateToken, disconnectSpotify);

export default router;
