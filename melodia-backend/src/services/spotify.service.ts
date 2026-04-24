/**
 * Response returned by Spotify when requesting an access token.
 */
type SpotifyTokenResponse = {
    /** Access token used for Spotify API requests. */
    access_token: string;

    /** Token type returned by Spotify, usually "Bearer". */
    token_type: string;

    /** Token lifetime in seconds. */
    expires_in: number;
};

/**
 * Represents a Spotify artist object.
 */
type SpotifyArtist = {
    /** Artist name. */
    name: string;
};

/**
 * Represents an image object returned by Spotify.
 */
type SpotifyImage = {
    /** Image URL. */
    url: string;

    /** Image height in pixels, or null if unavailable. */
    height: number | null;

    /** Image width in pixels, or null if unavailable. */
    width: number | null;
};

/**
 * Represents a Spotify album object.
 */
type SpotifyAlbum = {
    /** Album name. */
    name: string;

    /** Album cover images in different sizes. */
    images: SpotifyImage[];
};

/**
 * Represents a Spotify track object used by this service.
 */
type SpotifyTrack = {
    /** Spotify track ID. */
    id: string;

    /** Track name. */
    name: string;

    /** Artists credited on the track. */
    artists: SpotifyArtist[];

    /** Album the track belongs to. */
    album: SpotifyAlbum;

    /** External Spotify URLs for the track. */
    external_urls: {
        /** Public Spotify URL. */
        spotify: string;
    };
};

/**
 * Response returned by Spotify's search endpoint.
 */
type SpotifySearchResponse = {
    /** Search results grouped by track data. */
    tracks: {
        /** List of matching Spotify tracks. */
        items: SpotifyTrack[];
    };
};

/**
 * Response returned by Spotify's playlist items endpoint.
 */
type SpotifyPlaylistItemsResponse = {
    /** Playlist items containing track data. */
    items: {
        /** Spotify track object or null if unavailable. */
        track: SpotifyTrack | null;
    }[];
};

/**
 * Requests a Spotify access token using the Client Credentials flow.
 *
 * Reads Spotify credentials from environment variables, encodes them
 * for Basic authentication, and returns a valid access token.
 *
 * @returns Promise resolving to a Spotify access token.
 * @throws Error if Spotify credentials are missing.
 * @throws Error if the Spotify token request fails.
 */
const getSpotifyAccessToken = async (): Promise<string> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Spotify credentials are missing in the .env file.");
    }

    // Encode client ID and secret for Basic Auth
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });

    if (!response.ok) {
        throw new Error(`Spotify token error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as SpotifyTokenResponse;
    return data.access_token;
};

/**
 * Searches Spotify tracks by query.
 *
 * Fetches an access token, sends a search request to Spotify,
 * and maps the raw response into a simplified track structure
 * used by the frontend.
 *
 * @param query Search term used to find tracks.
 * @returns Promise resolving to a list of simplified track objects.
 * @throws Error if the Spotify search request fails.
 */
export const searchTracks = async (query: string) => {
    const accessToken = await getSpotifyAccessToken();

    const params = new URLSearchParams({
        q: query,
        type: "track",
        limit: "10"
    });

    const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Spotify search error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as SpotifySearchResponse;

    // Map raw Spotify response to a simplified structure for the frontend
    return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        imageUrl: track.album.images[0]?.url ?? null,
        spotifyUrl: track.external_urls.spotify
    }));
};

/**
 * Retrieves a single Spotify track by its ID.
 *
 * Fetches track details from Spotify and maps them into the structure
 * used when storing liked songs in the database.
 *
 * @param spotifyTrackId Spotify track ID to look up.
 * @returns Promise resolving to simplified track details, or null if not found.
 * @throws Error if the Spotify track lookup request fails.
 */
export const getTrackById = async (spotifyTrackId: string) => {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/tracks/${spotifyTrackId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Spotify track lookup error: ${response.status} ${response.statusText}`);
    }

    const track = (await response.json()) as SpotifyTrack;

    return {
        spotifyTrackId: track.id,
        songName: track.name,
        artistName: track.artists.map((artist) => artist.name).join(", "),
        albumName: track.album.name,
        imageUrl: track.album.images[0]?.url ?? null,
        spotifyUrl: track.external_urls.spotify
    };
};

/**
 * Retrieves tracks from a Spotify playlist.
 *
 * Fetches playlist items from Spotify and maps available tracks
 * into the simplified structure used by the frontend.
 *
 * @param playlistId Spotify playlist ID to fetch tracks from.
 * @returns Promise resolving to a list of simplified playlist tracks.
 * @throws Error if the Spotify playlist request fails.
 */
export const getPlaylistTracks = async (playlistId: string) => {
    const accessToken = await getSpotifyAccessToken();

    const params = new URLSearchParams({
        limit: "10",
        offset: "0"
    });

    const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?${params.toString()}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Spotify playlist error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as SpotifyPlaylistItemsResponse;

    return data.items
        .filter((item) => item.track !== null)
        .map((item) => {
            const track = item.track as SpotifyTrack;

            return {
                id: track.id,
                name: track.name,
                artists: track.artists.map((artist) => artist.name).join(", "),
                album: track.album.name,
                imageUrl: track.album.images[0]?.url ?? null,
                spotifyUrl: track.external_urls.spotify
            };
        });
};