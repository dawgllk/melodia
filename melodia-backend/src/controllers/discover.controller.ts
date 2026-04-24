import { Request, Response } from "express";
import { getPlaylistTracks } from "../services/spotify.service";

/**
 * Spotify playlist ID for the Global Top 50 chart.
 */
const GLOBAL_TOP_50_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";

/**
 * Spotify playlist ID for the Austria Top 50 chart.
 */
const AUSTRIA_TOP_50_PLAYLIST_ID = "37i9dQZEVXbKNHh6NIXu36";

/**
 * Retrieves the Global Top 50 tracks from Spotify.
 *
 * Calls the Spotify service to fetch tracks from the predefined
 * Global Top 50 playlist and returns them to the client.
 *
 * @param _req Express request (unused).
 * @param res Express response containing the track list or an error.
 * @returns Promise resolving to void.
 */
export const getGlobalTopTracks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tracks = await getPlaylistTracks(GLOBAL_TOP_50_PLAYLIST_ID);

        res.status(200).json({
            title: "Global Top 50",
            tracks
        });
    } catch (error) {
        console.error("Error fetching global top tracks:", error);

        res.status(500).json({
            error: "Failed to fetch global top tracks."
        });
    }
};

/**
 * Retrieves the Austria Top 50 tracks from Spotify.
 *
 * Calls the Spotify service to fetch tracks from the predefined
 * Austria Top 50 playlist and returns them to the client.
 *
 * @param _req Express request (unused).
 * @param res Express response containing the track list or an error.
 * @returns Promise resolving to void.
 */
export const getAustriaTopTracks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tracks = await getPlaylistTracks(AUSTRIA_TOP_50_PLAYLIST_ID);

        res.status(200).json({
            title: "Austria Top 50",
            tracks
        });
    } catch (error) {
        console.error("Error fetching Austria top tracks:", error);

        res.status(500).json({
            error: "Failed to fetch Austria top tracks."
        });
    }
};