import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { DetailsComponent } from './users/details/details.component';
import { NewComponent } from './users/new/new.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'users/:id', component: DetailsComponent },
      {
        path: 'users/new',
        component: NewComponent,
      },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
