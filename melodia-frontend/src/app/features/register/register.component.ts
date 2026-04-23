import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  countdown = 4;

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isRegistered = false;

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

  onClickHomepage() {
    this.router.navigate(['/']);
  }

  protected readonly count = count;
}
