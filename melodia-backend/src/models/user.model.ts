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