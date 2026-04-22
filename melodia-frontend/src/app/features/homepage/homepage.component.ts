import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
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
