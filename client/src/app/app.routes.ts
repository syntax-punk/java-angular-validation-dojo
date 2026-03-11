import { Routes } from '@angular/router';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { authGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './users/details/details.component';
import { NewUserComponent } from './users/new-user/new-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'users/new', component: NewUserComponent },
      { path: 'users/:id', component: DetailsComponent }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '' }
];
