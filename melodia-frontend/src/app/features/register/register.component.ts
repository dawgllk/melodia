import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { count } from 'rxjs';

/**
 * Component responsible for handling user registration.
 *
 * Provides a registration form, validates user input, communicates
 * with AuthService, and redirects the user after successful registration.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  /**
   * Authentication service used to perform registration requests.
   */
  private authService = inject(AuthService);

  /**
   * Angular router used for navigation after registration.
   */
  private router = inject(Router);

  /**
   * Countdown in seconds before redirecting after successful registration.
   */
  countdown = 4;

  /**
   * Username input entered by the user.
   */
  username = '';

  /**
   * Email input entered by the user.
   */
  email = '';

  /**
   * Password input entered by the user.
   */
  password = '';

  /**
   * Confirmation password input used to validate password equality.
   */
  confirmPassword = '';

  /**
   * Indicates whether a registration request is currently in progress.
   */
  isLoading = false;

  /**
   * Stores error messages displayed to the user.
   */
  errorMessage = '';

  /**
   * Stores success messages displayed after successful registration.
   */
  successMessage = '';

  /**
   * Indicates whether the user has successfully registered.
   */
  isRegistered = false;

  /**
   * Handles the registration form submission.
   *
   * Validates required fields and password confirmation, sends the
   * registration request via AuthService, updates UI state, and starts
   * a countdown before redirecting to the homepage.
   *
   * @returns void
   */
  onRegister(): void {
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    if (!username || !email || !password || !confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register({ username, email, password }).subscribe({
      next: (response) => {
        console.log('Registered user:', response.user);

        this.successMessage = `Welcome, ${response.user.username}!`;
        this.isRegistered = true;
        this.isLoading = false;

        const interval = setInterval(() => {
          this.countdown--;

          if (this.countdown === 0) {
            clearInterval(interval);
            this.router.navigate(['/']);
          }
        }, 1000);
      },
      error: (error) => {
        console.error('Register failed:', error);

        this.errorMessage = error?.error?.error || 'Something went wrong.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Navigates the user back to the homepage.
   *
   * @returns void
   */
  onClickHomepage() {
    this.router.navigate(['/']);
  }

  /**
   * Readonly reference to the RxJS count operator.
   *
   * This allows the imported count symbol to be exposed to the template
   * if needed.
   */
  protected readonly count = count;
}
