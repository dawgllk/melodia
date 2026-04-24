import { Router } from "express";
import {
    getAustriaTopTracks,
    getGlobalTopTracks
} from "../controllers/discover.controller";

/**
 * Router handling discover-related endpoints.
 *
 * Provides access to curated track lists such as
 * global and regional charts.
 */
const router = Router();

/**
 * Retrieves the Global Top 50 tracks.
 *
 * @route GET /discover/global
 * @access Public
 */
router.get("/discover/global", getGlobalTopTracks);

/**
 * Retrieves the Austria Top 50 tracks.
 *
 * @route GET /discover/austria
 * @access Public
 */
router.get("/discover/austria", getAustriaTopTracks);

/**
 * Test endpoint to verify that the discover routes are working.
 *
 * @route GET /discover/test
 * @access Public
 */
router.get("/discover/test", (_req, res) => {
    res.send("Discover route works");
});

/**
 * Exported discover router.
 */
export default router;