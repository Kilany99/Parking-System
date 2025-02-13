import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CarComponent } from './components/car/car.component';
import { ParkingZoneComponent } from './components/parking-zone/parking-zone.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserComponent } from './components/user/user.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
export const routes: Routes = [
   
      { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
      { path: 'cars', component: CarComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'User'] } },
      { path: 'parking-zones', component: ParkingZoneComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
      { path: 'payments', component: PaymentComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
      { path: 'reservations', component: ReservationComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'User'] } },
      { path: 'users', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'faq', component: FaqComponent },
      { path: '', component: LandingPageComponent },
    
];
