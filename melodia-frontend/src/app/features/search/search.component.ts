import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { Track } from '../../models/track.model';
import { LikeService } from '../../core/services/like.service';

/**
 * Component responsible for handling track search functionality.
 *
 * Allows users to enter a query, fetch matching tracks from the backend,
 * and display results while managing loading and error states.
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  /**
   * Service used to perform search requests to the backend API.
   */
  private searchService = inject(SearchService);
  /**
   * Service used to perform like requests to the backend API.
   */
  private likeService = inject(LikeService);

  /**
   * Current search query entered by the user.
   */
  query = '';

  /**
   * Stores the last successfully executed search query.
   */
  lastQuery = '';

  /**
   * List of tracks returned from the search request.
   */
  tracks: Track[] = [];

  /**
   * Indicates whether a search request is currently in progress.
   */
  isLoading = false;

  /**
   * Indicates whether a search has been performed.
   */
  hasSearched = false;

  /**
   * Stores error messages displayed to the user.
   */
  errorMessage = '';

  /**
   * Set containing IDs of liked tracks for fast lookup.
   */
  likedTrackIds = new Set<string>();

  /**
   * Handles the search action triggered by the user.
   *
   * Validates the query input, sends a request to the SearchService,
   * and updates the UI state including loading, results, and error handling.
   *
   * @returns void
   */
  onSearch(): void {
    const trimmedQuery = this.query.trim();

    if (!trimmedQuery) {
      this.tracks = [];
      this.hasSearched = false;
      this.errorMessage = 'Please enter a search term.';
      return;
    }

    this.isLoading = true;
    this.hasSearched = true;
    this.errorMessage = '';
    this.lastQuery = trimmedQuery;

    this.searchService.searchTracks(trimmedQuery).subscribe({
      next: (response) => {
        this.tracks = response.tracks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search request failed:', error);
        this.errorMessage = 'Something went wrong while searching for tracks.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Toggles the like state of a given track.
   *
   * If the track is already liked, it will be removed.
   * Otherwise, it will be added to the user's liked tracks.
   *
   * @param track - The track to like or unlike.
   */
  onToggleLike(track: Track): void {
    if (this.isTrackLiked(track.id)) {
      this.likeService.unlikeTrack(track.id).subscribe({
        next: () => {
          this.likedTrackIds.delete(track.id);
        },
        error: (err) => {
          console.error('Unlike failed:', err);
        },
      });
    } else {
      this.likeService.likeTrack(track.id).subscribe({
        next: () => {
          this.likedTrackIds.add(track.id);
        },
        error: (err) => {
          console.error('Like failed:', err);
        },
      });
    }
  }

  /**
   * Checks whether a track is currently liked by the user.
   *
   * @param trackId - The unique identifier of the track.
   * @returns True if the track is liked, otherwise false.
   */
  isTrackLiked(trackId: string): boolean {
    return this.likedTrackIds.has(trackId);
  }
}
