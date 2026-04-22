import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private searchService = inject(SearchService);

  query = '';
  lastQuery = '';
  tracks: Track[] = [];
  isLoading = false;
  hasSearched = false;
  errorMessage = '';

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

  onLikeClick(track: Track): void {
    console.log('Like clicked:', track.name);
  }
}
