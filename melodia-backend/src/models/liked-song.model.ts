import { Schema, model, InferSchemaType, Types } from "mongoose";

const likedSongSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        spotifyTrackId: {
            type: String,
            required: true
        },
        songName: {
            type: String,
            required: true
        },
        artistName: {
            type: String,
            required: true
        },
        albumName: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: null
        },
        spotifyUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Ensure a user cannot like the same track more than once
likedSongSchema.index({ userId: 1, spotifyTrackId: 1 }, { unique: true });

export type LikedSongDocument = InferSchemaType<typeof likedSongSchema> & {
    userId: Types.ObjectId;
};

export const LikedSong = model<LikedSongDocument>("LikedSong", likedSongSchema);