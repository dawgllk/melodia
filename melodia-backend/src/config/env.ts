import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "SPOTIFY_TOKEN_ENCRYPTION_KEY",
    "SPOTIFY_CLIENT_ID",
    "SPOTIFY_CLIENT_SECRET",
    "SPOTIFY_REDIRECT_URI",
    "FRONTEND_URL"
] as const;

type RequiredEnvVar = (typeof requiredEnvVars)[number];

const getRequiredEnv = (name: RequiredEnvVar): string => {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};

const getHexEncryptionKey = (): string => {
    const encryptionKey = getRequiredEnv("SPOTIFY_TOKEN_ENCRYPTION_KEY");

    if (!/^[a-f0-9]{64}$/i.test(encryptionKey)) {
        throw new Error("SPOTIFY_TOKEN_ENCRYPTION_KEY must be a 64-character hex string.");
    }

    return encryptionKey;
};

const getPort = (): number => {
    const rawPort = process.env.PORT?.trim();

    if (!rawPort) {
        return 3000;
    }

    const port = Number(rawPort);

    if (!Number.isInteger(port) || port <= 0) {
        throw new Error("PORT must be a positive integer.");
    }

    return port;
};

export const env = {
    port: getPort(),
    mongoUri: getRequiredEnv("MONGODB_URI"),
    jwtSecret: getRequiredEnv("JWT_SECRET"),
    spotifyTokenEncryptionKey: getHexEncryptionKey(),
    spotifyClientId: getRequiredEnv("SPOTIFY_CLIENT_ID"),
    spotifyClientSecret: getRequiredEnv("SPOTIFY_CLIENT_SECRET"),
    spotifyRedirectUri: getRequiredEnv("SPOTIFY_REDIRECT_URI"),
    frontendUrl: getRequiredEnv("FRONTEND_URL")
};
