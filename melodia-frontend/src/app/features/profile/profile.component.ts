import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';

interface UserProfile {
  username: string;
  email: string;
  createdAt?: string;
}

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
  private spotifyService = inject(SpotifyService);

  user: UserProfile | null = null;
  spotifyConnected = false;
  spotifyStatusLoading = false;
  spotifyDisconnecting = false;
  spotifyError = '';

  likedSongsCount = 0;
  playlistsCount = 0;

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.likedSongsCount = 12;
    this.playlistsCount = 3;

    this.loadSpotifyStatus();
  }

  get avatarLetter(): string {
    return this.user?.username?.charAt(0).toUpperCase() ?? 'M';
  }

  connectSpotify(): void {
    this.spotifyService.connect();
  }

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

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
