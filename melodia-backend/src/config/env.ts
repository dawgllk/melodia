import dotenv from "dotenv";

/**
 * Loads environment variables from the local `.env` file into process.env.
 */
dotenv.config();

/**
 * Environment variables that must be present before the application starts.
 */
const requiredEnvVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "SPOTIFY_TOKEN_ENCRYPTION_KEY",
    "SPOTIFY_CLIENT_ID",
    "SPOTIFY_CLIENT_SECRET",
    "SPOTIFY_REDIRECT_URI",
    "FRONTEND_URL"
] as const;

/**
 * Union type of all required environment variable names.
 */
type RequiredEnvVar = (typeof requiredEnvVars)[number];

/**
 * Reads a required environment variable and trims surrounding whitespace.
 *
 * @param name Name of the required environment variable.
 * @returns The configured environment variable value.
 * @throws Error if the variable is missing or empty.
 */
const getRequiredEnv = (name: RequiredEnvVar): string => {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};

/**
 * Reads and validates the encryption key used for Spotify OAuth tokens.
 *
 * AES-256-GCM requires a 32-byte key, represented here as a
 * 64-character hexadecimal string.
 *
 * @returns Validated Spotify token encryption key.
 * @throws Error if the key is not a 64-character hex string.
 */
const getHexEncryptionKey = (): string => {
    const encryptionKey = getRequiredEnv("SPOTIFY_TOKEN_ENCRYPTION_KEY");

    if (!/^[a-f0-9]{64}$/i.test(encryptionKey)) {
        throw new Error("SPOTIFY_TOKEN_ENCRYPTION_KEY must be a 64-character hex string.");
    }

    return encryptionKey;
};

/**
 * Reads and validates the HTTP port.
 *
 * Falls back to 3000 when PORT is not configured.
 *
 * @returns Port number used by the Express server.
 * @throws Error if PORT is configured but is not a positive integer.
 */
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

/**
 * Validated application configuration.
 *
 * Import this object instead of reading from process.env directly.
 */
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
