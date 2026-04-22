import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private elementRef = inject(ElementRef);
  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onClickProfile(): void {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/homepage']);
    this.isDropdownOpen = false;
  }

  isLoggedIn(): boolean {
    console.log(this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  onClickHomepage(): void {
    this.router.navigate(['/']);
  }

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
