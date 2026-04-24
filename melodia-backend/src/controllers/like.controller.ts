import { Response } from "express";
import { LikedSong } from "../models/liked-song.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { getTrackById } from "../services/spotify.service";

/**
 * Request body expected when liking a song.
 */
type LikeSongRequestBody = {
    /** Spotify track ID of the song to like */
    spotifyTrackId?: string;
};

/**
 * Creates a new liked song entry for the authenticated user.
 *
 * Validates the request, ensures the song is not already liked,
 * fetches track details from Spotify, and stores the result in the database.
 *
 * @param req Authenticated request containing user info and track ID.
 * @param res Express response used to return the created liked song or an error.
 * @returns Promise resolving to void.
 */
export const likeSong = async (
    req: AuthenticatedRequest<{}, {}, LikeSongRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { spotifyTrackId } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                error: "Unauthorized."
            });
            return;
        }

        if (!spotifyTrackId) {
            res.status(400).json({
                error: "spotifyTrackId is required."
            });
            return;
        }

        const existingLike = await LikedSong.findOne({
            userId,
            spotifyTrackId
        });

        if (existingLike) {
            res.status(409).json({
                error: "Song is already liked."
            });
            return;
        }

        // Fetch track details from Spotify so the backend stays the source of truth
        const track = await getTrackById(spotifyTrackId);

        if (!track) {
            res.status(404).json({
                error: "Track not found on Spotify."
            });
            return;
        }

        const likedSong = await LikedSong.create({
            userId,
            spotifyTrackId: track.spotifyTrackId,
            songName: track.songName,
            artistName: track.artistName,
            albumName: track.albumName,
            imageUrl: track.imageUrl,
            spotifyUrl: track.spotifyUrl
        });

        res.status(201).json({
            message: "Song liked successfully.",
            likedSong
        });
    } catch (error) {
        // Log unexpected errors during like creation
        console.error("Error in likeSong controller:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};

/**
 * Retrieves all liked songs for the authenticated user.
 *
 * Returns the list sorted by creation date (most recent first).
 *
 * @param req Authenticated request containing user info.
 * @param res Express response containing liked songs or an error.
 * @returns Promise resolving to void.
 */
export const getLikedSongs = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                error: "Unauthorized."
            });
            return;
        }

        const likedSongs = await LikedSong.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            likedSongs
        });
    } catch (error) {
        // Log unexpected errors during liked song retrieval
        console.error("Error in getLikedSongs controller:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};

/**
 * Removes a liked song for the authenticated user.
 *
 * Deletes the like entry matching the user and track ID.
 *
 * @param req Authenticated request containing user info and track ID as route param.
 * @param res Express response confirming deletion or returning an error.
 * @returns Promise resolving to void.
 */
export const unlikeSong = async (
    req: AuthenticatedRequest<{ spotifyTrackId: string }>,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { spotifyTrackId } = req.params;

        if (!userId) {
            res.status(401).json({
                error: "Unauthorized."
            });
            return;
        }

        const deletedLike = await LikedSong.findOneAndDelete({
            userId,
            spotifyTrackId
        });

        if (!deletedLike) {
            res.status(404).json({
                error: "Liked song not found."
            });
            return;
        }

        res.status(200).json({
            message: "Song unliked successfully."
        });
    } catch (error) {
        // Log unexpected errors during unlike operation
        console.error("Error in unlikeSong controller:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};

/**
 * Checks whether a specific track is liked by the authenticated user.
 *
 * @param req Authenticated request containing user info and track ID as route param.
 * @param res Express response containing like status or an error.
 * @returns Promise resolving to void.
 */
export const getLikedSongStatus = async (
    req: AuthenticatedRequest<{ spotifyTrackId: string }>,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { spotifyTrackId } = req.params;

        if (!userId) {
            res.status(401).json({
                error: "Unauthorized."
            });
            return;
        }

        const likedSong = await LikedSong.findOne({
            userId,
            spotifyTrackId
        });

        res.status(200).json({
            isLiked: Boolean(likedSong)
        });
    } catch (error) {
        // Log unexpected errors during liked song status lookup
        console.error("Error in getLikedSongStatus controller:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};