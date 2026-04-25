import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LikedSong } from '../../models/liked-track.model';

/**
 * Represents the response structure returned by the backend
 * when fetching the user's liked songs.
 *
 * The response contains an array of liked song objects.
 */
type LikedSongsResponse = {
  likedSongs: LikedSong[];
};

/**
 * Service responsible for handling all "like" related API interactions.
 *
 * This includes:
 * - Liking a track
 * - Retrieving liked tracks
 * - Removing a liked track
 *
 * The service communicates with the backend REST API and relies on
 * the AuthInterceptor to automatically attach the JWT token.
 */
@Injectable({
  providedIn: 'root',
})
export class LikeService {
  /**
   * Angular HttpClient used for making HTTP requests.
   */
  private http = inject(HttpClient);

  /**
   * Base API URL for backend communication.
   */
  private apiUrl = 'http://localhost:3000/api';

  /**
   * Sends a request to like a specific track by its Spotify track ID.
   *
   * The backend only requires the Spotify track ID and then fetches
   * the full track details directly from the Spotify API.
   *
   * @param spotifyTrackId - The unique Spotify ID of the track to like.
   * @returns Observable resolving when the track is successfully liked.
   */
  likeTrack(spotifyTrackId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/likes`, {
      spotifyTrackId,
    });
  }

  /**
   * Fetches all liked songs of the authenticated user.
   *
   * @returns Observable containing liked songs response.
   */
  getLikedTracks(): Observable<LikedSongsResponse> {
    return this.http.get<LikedSongsResponse>(`${this.apiUrl}/likes`);
  }

  /**
   * Removes a track from the user's liked songs.
   *
   * @param trackId - The unique identifier of the track to remove.
   * @returns Observable resolving when the track is successfully removed.
   */
  unlikeTrack(trackId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/likes/${trackId}`);
  }
}
