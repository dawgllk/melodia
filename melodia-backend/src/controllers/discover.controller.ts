import { Request, Response } from "express";
import { getPlaylistTracks } from "../services/spotify.service";

const GLOBAL_TOP_50_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";
const AUSTRIA_TOP_50_PLAYLIST_ID = "37i9dQZEVXbKNHh6NIXu36";

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