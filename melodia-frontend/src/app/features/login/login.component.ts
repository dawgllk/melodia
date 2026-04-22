import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  welcomeMessage = '';
  isLoggedIn = false;
  countdown = 4;

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

          const interval = setInterval(() => {
            this.countdown--;

            if (this.countdown === 0) {
              clearInterval(interval);
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

  onClickHomepage() {
    this.router.navigate(['/']);
  }
}
