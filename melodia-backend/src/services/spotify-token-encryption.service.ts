import crypto from "crypto";
import { env } from "../config/env";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH_BYTES = 12;
const AUTH_TAG_LENGTH_BYTES = 16;
const TOKEN_FORMAT_VERSION = "v1";

const encryptionKey = Buffer.from(env.spotifyTokenEncryptionKey, "hex");

/**
 * Encrypts a Spotify OAuth token before it is stored in MongoDB.
 *
 * Format: v1:<iv_hex>:<auth_tag_hex>:<ciphertext_hex>
 */
export const encryptSpotifyToken = (token: string): string => {
    const iv = crypto.randomBytes(IV_LENGTH_BYTES);
    const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv, {
        authTagLength: AUTH_TAG_LENGTH_BYTES
    });

    const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return [
        TOKEN_FORMAT_VERSION,
        iv.toString("hex"),
        authTag.toString("hex"),
        encrypted.toString("hex")
    ].join(":");
};

/**
 * Decrypts a Spotify OAuth token previously encrypted with encryptSpotifyToken.
 */
export const decryptSpotifyToken = (encryptedToken: string): string => {
    const [version, ivHex, authTagHex, encryptedHex] = encryptedToken.split(":");

    if (version !== TOKEN_FORMAT_VERSION || !ivHex || !authTagHex || !encryptedHex) {
        throw new Error("Invalid encrypted Spotify token format.");
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, Buffer.from(ivHex, "hex"), {
        authTagLength: AUTH_TAG_LENGTH_BYTES
    });

    decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

    return Buffer.concat([
        decipher.update(Buffer.from(encryptedHex, "hex")),
        decipher.final()
    ]).toString("utf8");
};
