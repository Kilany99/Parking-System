import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login-component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
   
    {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      
        // Protected routes
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuard],
        },
];
