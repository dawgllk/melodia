import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../core/services/like.service';
import { LikedSong } from '../../models/liked-track.model';

/**
 * Component responsible for displaying and managing the user's liked songs.
 */
@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css',
})
export class LikesComponent implements OnInit {
  /**
   * Service used for liked song API requests.
   */
  private likeService = inject(LikeService);

  /**
   * List of songs liked by the authenticated user.
   */
  likedSongs: LikedSong[] = [];

  /**
   * Indicates whether liked songs are currently being loaded.
   */
  isLoading = false;

  /**
   * Error message shown when loading or deleting liked songs fails.
   */
  errorMessage = '';

  /**
   * Loads liked songs when the component initializes.
   */
  ngOnInit(): void {
    this.loadLikedSongs();
  }

  /**
   * Fetches all liked songs from the backend.
   */
  loadLikedSongs(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.likeService.getLikedTracks().subscribe({
      next: (response) => {
        this.likedSongs = response.likedSongs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load liked songs:', error);
        this.errorMessage = 'Could not load liked songs.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Removes a song from the user's liked songs list.
   *
   * @param spotifyTrackId - Spotify track ID of the song to remove.
   */
  onUnlike(spotifyTrackId: string): void {
    this.likeService.unlikeTrack(spotifyTrackId).subscribe({
      next: () => {
        this.likedSongs = this.likedSongs.filter((song) => song.spotifyTrackId !== spotifyTrackId);
      },
      error: (error) => {
        console.error('Failed to unlike song:', error);
        this.errorMessage = 'Could not remove liked song.';
      },
    });
  }
}
