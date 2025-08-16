import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full',
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./components/tp-main-page/tp-main-page.component').then(
        (m) => m.TpMainPageComponent
      ),
  },
];
