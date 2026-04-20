import { Router } from "express";
import { searchSongs } from "../controllers/search.controller";

const router = Router();

router.get("/search", searchSongs);

export default router;