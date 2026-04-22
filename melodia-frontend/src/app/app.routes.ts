import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LikesComponent } from './features/likes/likes.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'likes',
    component: LikesComponent,
  }
];
