import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';

/**
 * Represents the response returned from the search endpoint.
 */
type SearchResponse = {
  /** The original search query sent to the backend */
  query: string;
  /** List of tracks matching the search query */
  tracks: Track[];
};

/**
 * Service responsible for searching tracks via the backend API.
 *
 * It sends a query string to the server and returns matching tracks.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /**
   * Angular HTTP client used for API communication.
   */
  private http = inject(HttpClient);

  /**
   * Base URL of the backend API.
   */
  private apiUrl = 'http://localhost:3000/api';

  /**
   * Sends a search request to the backend to retrieve tracks
   * matching the provided query string.
   *
   * The query is URL-encoded to ensure safe transmission.
   *
   * @param query The search term entered by the user.
   * @returns Observable emitting the search response containing matching tracks.
   */
  searchTracks(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
  }
}
