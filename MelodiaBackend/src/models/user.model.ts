import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        // Stores the hashed password (never store plain text passwords)
        passwordHash: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = model<UserDocument>("User", userSchema);