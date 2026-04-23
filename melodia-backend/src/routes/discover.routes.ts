import { Router } from "express";
import {
    getAustriaTopTracks,
    getGlobalTopTracks
} from "../controllers/discover.controller";

const router = Router();

router.get("/discover/global", getGlobalTopTracks);
router.get("/discover/austria", getAustriaTopTracks);
router.get("/discover/test", (_req, res) => {
    res.send("Discover route works");
});

export default router;