import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);

  onClickLogin(): void {
    this.router.navigate(['/login']);
  }

  onClickRegister(): void {
    this.router.navigate(['/register']);
  }

  onClickLikedSongs(): void {
    this.router.navigate(['/likes']);
  }

  onClickSearch(): void {
    this.router.navigate(['/search']);
  }
}
