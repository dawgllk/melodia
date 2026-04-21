import { Router } from "express";
import {
    getCurrentUser,
    registerUser,
    loginUser
} from "../controllers/auth.controller";
import {authenticateToken} from "../middleware/auth.middleware";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authenticateToken, getCurrentUser);

export default router;