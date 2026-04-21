import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import {AuthenticatedRequest} from "../middleware/auth.middleware";

type RegisterRequestBody = {
    username?: string;
    email?: string;
    password?: string;
};

type LoginRequestBody = {
    email?: string;
    password?: string;
};

export const registerUser = async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({
                error: "username, email and password are required."
            });
            return;
        }

        if (username.trim().length < 3) {
            res.status(400).json({
                error: "Username must be at least 3 characters long."
            });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                error: "Password must be at least 6 characters long."
            });
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            res.status(409).json({
                error: "A user with this email already exists."
            });
            return;
        }

        // Hash the password before storing it in the database
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username.trim(),
            email: normalizedEmail,
            passwordHash
        });

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error("JWT_SECRET is missing in environment variables");

            res.status(500).json({
                error: "Server configuration error."
            });
            return;
        }

        // Create a signed token so the user can access protected routes
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            jwtSecret,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            message: "User created successfully.",
            token,
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        // Log unexpected registration errors for debugging
        console.error("Registration error:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};

export const loginUser = async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                error: "Email and password are required."
            });
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            res.status(401).json({
                error: "Invalid email or password."
            });
            return;
        }

        // Compare the provided password with the stored password hash
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatches) {
            res.status(401).json({
                error: "Invalid email or password."
            });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error("JWT_SECRET is missing in environment variables");

            res.status(500).json({
                error: "Server configuration error."
            });
            return;
        }


        // Issue a new token after successful authentication
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            jwtSecret,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        // Log unexpected login errors for debugging
        console.error("Login error:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};

export const getCurrentUser = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                error: "Unauthorized."
            });
            return;
        }

        const user = await User.findById(req.user.userId).select("-passwordHash");

        if (!user) {
            res.status(404).json({
                error: "User not found."
            });
            return;
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        // Log unexpected errors during current user lookup
        console.error("Error in getCurrentUser controller:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};