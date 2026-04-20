type SpotifyTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

type SpotifyArtist = {
    name: string;
};

type SpotifyImage = {
    url: string;
    height: number | null;
    width: number | null;
};

type SpotifyAlbum = {
    name: string;
    images: SpotifyImage[];
};

type SpotifyTrack = {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    external_urls: {
        spotify: string;
    };
};

type SpotifySearchResponse = {
    tracks: {
        items: SpotifyTrack[];
    };
};

// Request a new access token using Spotify's Client Credentials Flow
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