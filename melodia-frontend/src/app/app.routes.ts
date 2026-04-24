import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LikesComponent } from './features/likes/likes.component';
import { ProfileComponent } from './features/profile/profile.component';

/**
 * Application route configuration.
 *
 * Defines all available client-side routes and maps them
 * to their corresponding components.
 */
export const routes: Routes = [
  {
    /**
     * Default route (homepage).
     *
     * Triggered when the user visits the root URL.
     */
    path: '',
    component: HomepageComponent,
  },
  {
    /**
     * Profile page route.
     */
    path: 'profile',
    component: ProfileComponent,
  },
  {
    /**
     * Search page route.
     */
    path: 'search',
    component: SearchComponent,
  },
  {
    /**
     * Login page route.
     */
    path: 'login',
    component: LoginComponent,
  },
  {
    /**
     * Registration page route.
     */
    path: 'register',
    component: RegisterComponent,
  },
  {
    /**
     * Liked songs page route.
     */
    path: 'likes',
    component: LikesComponent,
  },
];
