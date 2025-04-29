import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'characters',
    loadComponent: () => import('./characters/characters.page').then( m => m.CharactersPage)
  }
];
