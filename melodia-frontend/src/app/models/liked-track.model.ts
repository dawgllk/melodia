/**
 * Represents a song that has been liked by a user and stored in the database.
 *
 * This model reflects the structure returned by the backend API.
 */
export interface LikedSong {
  /**
   * Unique identifier of the liked song entry in the database.
   */
  _id: string;

  /**
   * ID of the user who liked the song.
   */
  userId: string;

  /**
   * Spotify track ID of the liked song.
   */
  spotifyTrackId: string;

  /**
   * Name of the song.
   */
  songName: string;

  /**
   * Name of the artist(s).
   */
  artistName: string;

  /**
   * Name of the album.
   */
  albumName: string;

  /**
   * URL of the album cover image.
   * Can be null if no image is available.
   */
  imageUrl: string | null;

  /**
   * Direct link to the track on Spotify.
   */
  spotifyUrl: string;

  /**
   * Timestamp when the song was liked.
   */
  createdAt: string;

  /**
   * Timestamp when the liked entry was last updated.
   */
  updatedAt: string;
}
