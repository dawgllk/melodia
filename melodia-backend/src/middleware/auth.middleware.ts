import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    userId: string;
    email: string;
};

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            error: "Access token is missing or invalid."
        });
        return;
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error("JWT_SECRET is missing in environment variables");

        res.status(500).json({
            error: "Server configuration error."
        });
        return;
    }

    try {
        req.user = jwt.verify(token, jwtSecret) as JwtPayload;

        next();
    } catch (error) {
        // Reject invalid or expired tokens
        console.error("Token verification failed:", error);

        res.status(401).json({
            error: "Invalid or expired token."
        });
    }
};