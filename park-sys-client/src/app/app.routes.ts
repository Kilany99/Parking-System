import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login-component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CarComponent } from './components/car/car.component';
import { ParkingZoneComponent } from './components/parking-zone/parking-zone.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserComponent } from './components/user/user.component';
export const routes: Routes = [
   
    {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      { path: 'cars', component: CarComponent, canActivate: [AuthGuard] },
      { path: 'parking-zones', component: ParkingZoneComponent },
      { path: 'payments', component: PaymentComponent, canActivate: [AuthGuard] },
      { path: 'reservations', component: ReservationComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserComponent, canActivate: [AuthGuard] }, // For admin users
      {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuard],
        },
];
