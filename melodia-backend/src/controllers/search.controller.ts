import { Request, Response } from "express";
import { searchTracks } from "../services/spotify.service";

export const searchSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.q;

        if (typeof query !== "string" || query.trim().length === 0) {
            res.status(400).json({
                error: "Query parameter 'q' is required."
            });
            return;
        }

        // Delegate Spotify API call to service layer
        const tracks = await searchTracks(query);

        res.status(200).json({
            query,
            tracks
        });
    } catch (error) {
        // Log unexpected errors during search
        console.error("Error in searchSongs controller:", error);

        res.status(500).json({
            error: "Internal server error."
        });
    }
};