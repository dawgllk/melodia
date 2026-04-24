import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Payload structure encoded داخل JWT tokens.
 */
type JwtPayload = {
    /** Unique identifier of the authenticated user */
    userId: string;

    /** Email of the authenticated user */
    email: string;
};

/**
 * Extended Express request interface that includes authenticated user data.
 *
 * This is used after the authentication middleware successfully verifies a token.
 *
 * @template Params Route parameters type
 * @template ResBody Response body type
 * @template ReqBody Request body type
 * @template ReqQuery Query parameters type
 */
export interface AuthenticatedRequest<
    Params = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    /**
     * Decoded JWT payload attached after successful authentication.
     */
    user?: JwtPayload;
}

/**
 * Middleware for verifying JWT access tokens.
 *
 * Extracts the token from the Authorization header, verifies it,
 * and attaches the decoded payload to the request object.
 *
 * If the token is missing, invalid, or expired, the request is rejected.
 *
 * @param req Incoming request extended with optional user data.
 * @param res Express response used to return authentication errors.
 * @param next Next middleware function in the request pipeline.
 * @returns void
 */
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