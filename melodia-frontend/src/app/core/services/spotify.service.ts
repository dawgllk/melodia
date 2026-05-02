import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export type SpotifyStatusResponse = {
  connected: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/spotify`;

  getStatus(): Observable<SpotifyStatusResponse> {
    return this.http.get<SpotifyStatusResponse>(`${this.apiUrl}/status`);
  }

  disconnect(): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/disconnect`);
  }

  connect(): void {
    const token = this.authService.getToken();

    if (!token) {
      window.location.href = '/login';
      return;
    }

    window.location.href = `${this.apiUrl}/login?token=${encodeURIComponent(token)}`;
  }
}
