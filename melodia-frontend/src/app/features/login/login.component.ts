import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Component responsible for handling user login.
 *
 * Provides a form for user credentials, communicates with AuthService,
 * and manages UI state such as loading, error handling, and redirect logic.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  /**
   * Authentication service used to perform login requests.
   */
  private authService = inject(AuthService);

  /**
   * Angular router used for navigation after login.
   */
  private router = inject(Router);

  /**
   * User's email input.
   */
  email = '';

  /**
   * User's password input.
   */
  password = '';

  /**
   * Indicates whether a login request is currently in progress.
   */
  isLoading = false;

  /**
   * Stores error messages displayed to the user.
   */
  errorMessage = '';

  /**
   * Message displayed after successful login.
   */
  welcomeMessage = '';

  /**
   * Indicates whether the user has successfully logged in.
   */
  isLoggedIn = false;

  /**
   * Countdown in seconds before redirecting after successful login.
   */
  countdown = 4;

  /**
   * Active redirect countdown interval.
   */
  private redirectIntervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * Handles the login form submission.
   *
   * Validates user input, sends login request via AuthService,
   * and manages UI state such as loading, success message,
   * error handling, and redirect countdown.
   *
   * @returns void
   */
  onLogin(): void {
    const trimmedEmail = this.email.trim();

    if (!trimmedEmail || !this.password.trim()) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login({
        email: trimmedEmail,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          this.welcomeMessage = `Login successful! Welcome, ${response.user.username}!`;
          this.isLoggedIn = true;
          this.isLoading = false;

          this.clearRedirectTimer();

          this.redirectIntervalId = setInterval(() => {
            this.countdown--;

            if (this.countdown === 0) {
              this.clearRedirectTimer();
              this.router.navigate(['/']);
            }
          }, 1000);
        },
        error: (error) => {
          console.error('Login request failed:', error);
          this.errorMessage = error?.error?.error ?? 'Login failed. Please try again.';
          this.isLoading = false;
        },
      });
  }

  /**
   * Navigates the user to the homepage.
   *
   * @returns void
   */
  onClickHomepage(): void {
    this.clearRedirectTimer();
    this.router.navigate(['/']);
  }

  /**
   * Clears any active redirect timer when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.clearRedirectTimer();
  }

  /**
   * Stops the redirect countdown if it is currently running.
   */
  private clearRedirectTimer(): void {
    if (this.redirectIntervalId) {
      clearInterval(this.redirectIntervalId);
      this.redirectIntervalId = null;
    }
  }
}
