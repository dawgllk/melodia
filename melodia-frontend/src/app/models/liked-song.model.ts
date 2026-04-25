/**
 * Represents a song liked by the currently authenticated user.
 */
export interface LikedSong {
  _id: string;
  userId: string;
  spotifyTrackId: string;
  songName: string;
  artistName: string;
  albumName: string;
  imageUrl: string | null;
  spotifyUrl: string;
  createdAt: string;
  updatedAt: string;
}
