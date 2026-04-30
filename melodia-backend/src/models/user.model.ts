import { Schema, model, InferSchemaType } from "mongoose";

/**
 * Mongoose schema representing a user.
 *
 * Stores basic user information and authentication data.
 */
const userSchema = new Schema(
    {
        /**
         * Unique username chosen by the user.
         *
         * Trimmed and validated for length constraints.
         */
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },

        /**
         * User's email address.
         *
         * Stored in lowercase and must be unique.
         */
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        /**
         * Hashed password of the user.
         *
         * Never stores plain text passwords.
         */
        passwordHash: {
            type: String,
            required: true
        },

        /**
         * Spotify OAuth access token for user-specific Spotify requests.
         *
         * Stored only on the backend and never returned to the frontend.
         */
        spotifyAccessToken: {
            type: String,
            default: null
        },

        /**
         * Spotify OAuth refresh token for renewing user-specific access.
         *
         * Stored only on the backend and never returned to the frontend.
         */
        spotifyRefreshToken: {
            type: String,
            default: null
        },

        /**
         * Timestamp indicating when Spotify was last connected.
         */
        spotifyConnectedAt: {
            type: Date,
            default: null
        }
    },
    {
        /**
         * Automatically adds createdAt and updatedAt timestamps.
         */
        timestamps: true
    }
);

/**
 * Type representing a user document in the database.
 */
export type UserDocument = InferSchemaType<typeof userSchema>;

/**
 * Mongoose model for interacting with the users collection.
 */
export const User = model<UserDocument>("User", userSchema);
