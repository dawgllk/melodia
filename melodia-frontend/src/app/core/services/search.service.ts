import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';

type SearchResponse = {
  query: string;
  tracks: Track[];
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  searchTracks(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
  }
}
