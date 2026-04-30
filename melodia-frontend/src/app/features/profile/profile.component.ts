import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

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

  user: UserProfile | null = null;

  likedSongsCount = 0;
  playlistsCount = 0;

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.likedSongsCount = 12;
    this.playlistsCount = 3;
  }

  get avatarLetter(): string {
    return this.user?.username?.charAt(0).toUpperCase() ?? 'M';
  }

  connectSpotify(): void {
    window.location.href = 'http://localhost:3000/api/spotify/login';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
