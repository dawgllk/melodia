import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';

/**
 * Basic profile information shown on the profile page.
 */
interface UserProfile {
  /**
   * Display username of the authenticated user.
   */
  username: string;

  /**
   * Email address of the authenticated user.
   */
  email: string;

  /**
   * Optional account creation date returned by the backend.
   */
  createdAt?: string;
}

/**
 * Component responsible for displaying the user's profile page.
 *
 * Shows local user information, Spotify connection status,
 * Spotify connect/disconnect actions, and logout behavior.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  /**
   * Angular router used for page navigation.
   */
  private router = inject(Router);

  /**
   * Authentication service used to access login state and perform logout.
   */
  private authService = inject(AuthService);

  /**
   * Spotify service used to check and manage Spotify connection state.
   */
  private spotifyService = inject(SpotifyService);

  /**
   * Profile information for the currently authenticated user.
   */
  user: UserProfile | null = null;

  /**
   * Whether the current user has connected Spotify.
   */
  spotifyConnected = false;

  /**
   * Indicates whether the Spotify connection status is being loaded.
   */
  spotifyStatusLoading = false;

  /**
   * Indicates whether a Spotify disconnect request is in progress.
   */
  spotifyDisconnecting = false;

  /**
   * Error message shown for Spotify status or disconnect failures.
   */
  spotifyError = '';

  /**
   * Number of songs liked by the user.
   */
  likedSongsCount = 0;

  /**
   * Number of playlists associated with the user.
   */
  playlistsCount = 0;

  /**
   * Loads local user data and Spotify connection status when the page opens.
   */
  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.likedSongsCount = 12;
    this.playlistsCount = 3;

    this.loadSpotifyStatus();
  }

  /**
   * First letter used as the profile avatar fallback.
   *
   * @returns Uppercase first username letter, or M if no username exists.
   */
  get avatarLetter(): string {
    return this.user?.username?.charAt(0).toUpperCase() ?? 'M';
  }

  /**
   * Starts the Spotify OAuth connection flow.
   */
  connectSpotify(): void {
    this.spotifyService.connect();
  }

  /**
   * Disconnects Spotify for the current user and refreshes the UI state.
   */
  disconnectSpotify(): void {
    this.spotifyDisconnecting = true;
    this.spotifyError = '';

    this.spotifyService.disconnect().subscribe({
      next: () => {
        this.spotifyConnected = false;
        this.spotifyDisconnecting = false;
        this.loadSpotifyStatus();
      },
      error: () => {
        this.spotifyDisconnecting = false;
        this.spotifyError = 'Could not disconnect Spotify. Please try again.';
      },
    });
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Loads the current user's Spotify connection status from the backend.
   */
  private loadSpotifyStatus(): void {
    this.spotifyStatusLoading = true;
    this.spotifyError = '';

    this.spotifyService.getStatus().subscribe({
      next: (status) => {
        this.spotifyConnected = status.connected;
        this.spotifyStatusLoading = false;
      },
      error: () => {
        this.spotifyConnected = false;
        this.spotifyStatusLoading = false;
        this.spotifyError = 'Could not load Spotify connection status.';
      },
    });
  }
}
