import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

/**
 * Represents the Spotify connection status returned by the backend.
 */
export type SpotifyStatusResponse = {
  /**
   * Whether the current user has Spotify connected.
   */
  connected: boolean;
};

/**
 * Service responsible for Spotify connection API interactions.
 *
 * It checks connection status, disconnects Spotify, and starts the
 * backend-driven Spotify OAuth flow for the authenticated user.
 */
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  /**
   * Angular HTTP client used for Spotify API requests.
   */
  private http = inject(HttpClient);

  /**
   * Authentication service used to retrieve the current JWT.
   */
  private authService = inject(AuthService);

  /**
   * Base URL for Spotify-related backend endpoints.
   */
  private apiUrl = `${environment.apiUrl}/spotify`;

  /**
   * Fetches whether the current user has Spotify connected.
   *
   * @returns Observable containing the Spotify connection status.
   */
  getStatus(): Observable<SpotifyStatusResponse> {
    return this.http.get<SpotifyStatusResponse>(`${this.apiUrl}/status`);
  }

  /**
   * Disconnects the current user's Spotify account.
   *
   * @returns Observable resolving when Spotify has been disconnected.
   */
  disconnect(): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/disconnect`);
  }

  /**
   * Starts the Spotify OAuth login flow for the authenticated user.
   *
   * Redirects to login if no JWT is available locally.
   */
  connect(): void {
    const token = this.authService.getToken();

    if (!token) {
      window.location.href = '/login';
      return;
    }

    window.location.href = `${this.apiUrl}/login?token=${encodeURIComponent(token)}`;
  }
}
