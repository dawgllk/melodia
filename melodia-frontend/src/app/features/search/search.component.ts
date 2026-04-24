import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { Track } from '../../models/track.model';

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
   * Handles the "like" action for a specific track.
   *
   * Currently logs the track name to the console. Can be extended
   * to integrate with a favorites or playlist feature.
   *
   * @param track The track that was liked by the user.
   * @returns void
   */
  onLikeClick(track: Track): void {
    console.log('Like clicked:', track.name);
  }
}
