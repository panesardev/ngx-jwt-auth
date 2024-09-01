import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TitleResolver } from './shared/resolvers/title.resolver';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: TitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: TitleResolver,
  }
];
