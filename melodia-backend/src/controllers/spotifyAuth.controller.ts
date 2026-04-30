import { Request, Response } from "express";
import querystring from "querystring";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { User } from "../models/user.model";

type SpotifyOAuthState = {
    userId: string;
    nonce: string;
};

type SpotifyTokenResponse = {
    access_token: string;
    refresh_token?: string;
};

const generateRandomString = (length: number): string => {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
};

const getJwtSecret = (): string | null => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error("JWT_SECRET is missing in environment variables");
        return null;
    }

    return jwtSecret;
};

const getBearerToken = (req: Request): string | null => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }

    const queryToken = req.query.token;

    if (typeof queryToken === "string") {
        return queryToken;
    }

    return null;
};

export const loginWithSpotify = (req: Request, res: Response): void => {
    const jwtSecret = getJwtSecret();

    if (!jwtSecret) {
        res.status(500).json({ error: "Server configuration error." });
        return;
    }

    const token = getBearerToken(req);

    if (!token) {
        res.status(401).json({ error: "Access token is missing or invalid." });
        return;
    }

    let userId: string;

    try {
        const payload = jwt.verify(token, jwtSecret) as { userId?: string };

        if (!payload.userId) {
            res.status(401).json({ error: "Invalid or expired token." });
            return;
        }

        userId = payload.userId;
    } catch (error) {
        console.error("Spotify login token verification failed:", error);

        res.status(401).json({ error: "Invalid or expired token." });
        return;
    }

    const state = jwt.sign(
        {
            userId,
            nonce: generateRandomString(16)
        },
        jwtSecret,
        {
            expiresIn: "10m"
        }
    );

    console.log("Spotify redirect URI:", process.env.SPOTIFY_REDIRECT_URI);

    const scope = [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "playlist-read-private"
    ].join(" ");

    const queryParams = querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};

export const spotifyCallback = async (req: Request, res: Response): Promise<void> => {
    const code = req.query.code as string | undefined;
    const state = req.query.state as string | undefined;
    const error = req.query.error as string | undefined;

    if (error) {
        res.redirect(`${process.env.FRONTEND_URL}/profile?spotify_error=${error}`);
        return;
    }

    if (!code) {
        res.status(400).json({ message: "Spotify authorization code is missing" });
        return;
    }

    if (!state) {
        res.status(400).json({ message: "Spotify authorization state is missing" });
        return;
    }

    const jwtSecret = getJwtSecret();

    if (!jwtSecret) {
        res.status(500).json({ error: "Server configuration error." });
        return;
    }

    let spotifyState: SpotifyOAuthState;

    try {
        spotifyState = jwt.verify(state, jwtSecret) as SpotifyOAuthState;
    } catch (error) {
        console.error("Spotify state verification failed:", error);

        res.status(400).json({ message: "Spotify authorization state is invalid or expired" });
        return;
    }

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string
    });

    const authHeader = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body
    });

    if (!tokenResponse.ok) {
        res.status(500).json({ message: "Failed to get Spotify access token" });
        return;
    }

    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

    const update: {
        spotifyAccessToken: string;
        spotifyRefreshToken?: string;
        spotifyConnectedAt: Date;
    } = {
        spotifyAccessToken: tokenData.access_token,
        spotifyConnectedAt: new Date()
    };

    if (tokenData.refresh_token) {
        update.spotifyRefreshToken = tokenData.refresh_token;
    }

    const user = await User.findByIdAndUpdate(spotifyState.userId, update, {
        new: true
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.redirect(`${process.env.FRONTEND_URL}/profile?spotify_connected=true`);
};

export const getSpotifyStatus = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized." });
            return;
        }

        const user = await User.findById(req.user.userId).select("spotifyRefreshToken spotifyAccessToken");

        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }

        res.status(200).json({
            connected: Boolean(user.spotifyRefreshToken || user.spotifyAccessToken)
        });
    } catch (error) {
        console.error("Error checking Spotify status:", error);

        res.status(500).json({ error: "Internal server error." });
    }
};

export const disconnectSpotify = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized." });
            return;
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {
                $unset: {
                    spotifyAccessToken: "",
                    spotifyRefreshToken: "",
                    spotifyConnectedAt: ""
                }
            },
            {
                new: true
            }
        );

        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }

        res.status(200).json({
            connected: false
        });
    } catch (error) {
        console.error("Error disconnecting Spotify:", error);

        res.status(500).json({ error: "Internal server error." });
    }
};
