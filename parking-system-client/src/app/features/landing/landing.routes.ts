import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  }
];