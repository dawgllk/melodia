import { Router } from "express";
import { searchSongs } from "../controllers/search.controller";

/**
 * Router handling search-related endpoints.
 *
 * Provides functionality to search for tracks.
 */
const router = Router();

/**
 * Searches for songs based on a query string.
 *
 * @route GET /search
 * @access Public
 */
router.get("/search", searchSongs);

/**
 * Exported search router.
 */
export default router;