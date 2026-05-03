/**
 * Represents a track returned from the Spotify search API.
 *
 * This model is used by the frontend search results and like actions.
 */
export interface Track {
  /**
   * Spotify track ID.
   */
  id: string;

  /**
   * Name of the track.
   */
  name: string;

  /**
   * Display name of the track artist or artists.
   */
  artists: string;

  /**
   * Name of the album the track belongs to.
   */
  album: string;

  /**
   * URL of the album artwork.
   * Can be null if Spotify does not provide an image.
   */
  imageUrl: string | null;

  /**
   * Direct Spotify URL for opening the track.
   */
  spotifyUrl: string;
}
