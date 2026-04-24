import { Router } from "express";
import {
    getCurrentUser,
    registerUser,
    loginUser
} from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

/**
 * Router handling authentication-related endpoints.
 *
 * Includes routes for user registration, login, and retrieving
 * the currently authenticated user.
 */
const router = Router();

/**
 * Registers a new user.
 *
 * @route POST /auth/register
 * @access Public
 */
router.post("/auth/register", registerUser);

/**
 * Logs in an existing user.
 *
 * @route POST /auth/login
 * @access Public
 */
router.post("/auth/login", loginUser);

/**
 * Retrieves the currently authenticated user.
 *
 * Requires a valid JWT token.
 *
 * @route GET /auth/me
 * @access Protected
 */
router.get("/auth/me", authenticateToken, getCurrentUser);

/**
 * Exported authentication router.
 */
export default router;