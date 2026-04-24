import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

/**
 * Represents the payload sent to the backend for user login.
 */
type LoginRequest = {
  /** The user's email address */
  email: string;
  /** The user's plain text password */
  password: string;
};

/**
 * Represents the payload sent to the backend for user registration.
 */
type RegisterRequest = {
  /** The desired username */
  username: string;
  /** The user's email address */
  email: string;
  /** The user's plain text password */
  password: string;
};

/**
 * Represents an authenticated user returned by the backend.
 */
export type AuthUser = {
  /** Unique identifier of the user */
  id: string;
  /** Username of the user */
  username: string;
  /** Email address of the user */
  email: string;
};

/**
 * Represents the authentication response returned by the backend.
 */
type AuthResponse = {
  /** Informational message from the server */
  message: string;
  /** JWT token used for authenticated requests */
  token: string;
  /** Authenticated user object */
  user: AuthUser;
};

/**
 * Service responsible for handling authentication logic such as
 * login, registration, logout, and local session management.
 *
 * It communicates with the backend API and persists authentication
 * data (token and user) in the browser's localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Angular HTTP client used for API communication.
   */
  private http = inject(HttpClient);

  /**
   * Base URL of the backend API.
   */
  private apiUrl = 'http://localhost:3000/api';

  /**
   * LocalStorage key used to store the authentication token.
   */
  private tokenKey = 'melodia_token';

  /**
   * LocalStorage key used to store the authenticated user.
   */
  private userKey = 'melodia_user';

  /**
   * Sends login credentials to the backend and stores the returned
   * token and user data in localStorage.
   *
   * @param credentials The login request payload containing email and password.
   * @returns Observable emitting the authentication response from the server.
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
      }),
    );
  }

  /**
   * Sends registration data to the backend and stores the returned
   * token and user data in localStorage.
   *
   * @param credentials The registration payload containing username, email, and password.
   * @returns Observable emitting the authentication response from the server.
   */
  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
      }),
    );
  }

  /**
   * Logs out the current user by removing authentication data
   * from localStorage.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Retrieves the stored authentication token.
   *
   * @returns The JWT token if available, otherwise null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Retrieves the stored authenticated user from localStorage.
   *
   * @returns Parsed AuthUser object if available, otherwise null.
   */
  getUser(): AuthUser | null {
    const storedUser = localStorage.getItem(this.userKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  /**
   * Retrieves the username of the currently authenticated user.
   *
   * @returns The username if available, otherwise null.
   */
  getUsername(): string | null {
    return this.getUser()?.username ?? null;
  }

  /**
   * Checks whether a user is currently logged in.
   *
   * A user is considered logged in if both a token and user
   * object are present in localStorage.
   *
   * @returns True if logged in, otherwise false.
   */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}
