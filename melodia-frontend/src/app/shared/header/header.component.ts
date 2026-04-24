import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ElementRef, HostListener } from '@angular/core';

/**
 * Component responsible for displaying and controlling the application header.
 *
 * Handles navigation, authentication-related actions, and dropdown behavior.
 */
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  /**
   * Angular router used for page navigation.
   */
  private router = inject(Router);

  /**
   * Authentication service used to access login state and perform logout.
   */
  private authService = inject(AuthService);

  /**
   * Reference to the component's host element.
   *
   * Used to detect clicks outside the header dropdown.
   */
  private elementRef = inject(ElementRef);

  /**
   * Indicates whether the profile dropdown is currently open.
   */
  isDropdownOpen = false;

  /**
   * Handles document click events and closes the dropdown
   * when the user clicks outside the component.
   *
   * @param event The mouse click event triggered on the document.
   * @returns void
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  /**
   * Toggles the visibility of the profile dropdown.
   *
   * @returns void
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Navigates the user to the profile page and closes the dropdown.
   *
   * @returns void
   */
  onClickProfile(): void {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }

  /**
   * Logs out the current user, navigates to the homepage,
   * and closes the dropdown.
   *
   * @returns void
   */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/homepage']);
    this.isDropdownOpen = false;
  }

  /**
   * Checks whether the user is currently logged in.
   *
   * @returns True if the user is logged in, otherwise false.
   */
  isLoggedIn(): boolean {
    console.log(this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }

  /**
   * Retrieves the username of the currently logged-in user.
   *
   * @returns The username if available, otherwise null.
   */
  getUsername(): string | null {
    return this.authService.getUsername();
  }

  /**
   * Navigates the user to the homepage.
   *
   * @returns void
   */
  onClickHomepage(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigates the user to the login page.
   *
   * @returns void
   */
  onClickLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigates the user to the registration page.
   *
   * @returns void
   */
  onClickRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Navigates the user to the liked songs page.
   *
   * @returns void
   */
  onClickLikedSongs(): void {
    this.router.navigate(['/likes']);
  }

  /**
   * Navigates the user to the search page.
   *
   * @returns void
   */
  onClickSearch(): void {
    this.router.navigate(['/search']);
  }
}
