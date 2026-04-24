import { Schema, model, InferSchemaType, Types } from "mongoose";

/**
 * Mongoose schema representing a liked song.
 *
 * Stores track metadata along with the user who liked the track.
 */
const likedSongSchema = new Schema(
    {
        /**
         * Reference to the user who liked the song.
         */
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        /**
         * Unique Spotify track identifier.
         */
        spotifyTrackId: {
            type: String,
            required: true
        },

        /**
         * Name of the song.
         */
        songName: {
            type: String,
            required: true
        },

        /**
         * Name of the artist.
         */
        artistName: {
            type: String,
            required: true
        },

        /**
         * Name of the album the track belongs to.
         */
        albumName: {
            type: String,
            required: true
        },

        /**
         * URL of the track's album cover image.
         * Can be null if no image is available.
         */
        imageUrl: {
            type: String,
            default: null
        },

        /**
         * Direct Spotify URL to the track.
         */
        spotifyUrl: {
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
 * Compound index to ensure that a user cannot like
 * the same track more than once.
 */
likedSongSchema.index({ userId: 1, spotifyTrackId: 1 }, { unique: true });

/**
 * Type representing a liked song document.
 *
 * Extends the inferred schema type and ensures userId is typed as ObjectId.
 */
export type LikedSongDocument = InferSchemaType<typeof likedSongSchema> & {
    userId: Types.ObjectId;
};

/**
 * Mongoose model for interacting with liked songs collection.
 */
export const LikedSong = model<LikedSongDocument>("LikedSong", likedSongSchema);