// src/app/features/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
//import { ParkingZonesComponent } from './components/parking-zones/parking-zones.component';
//import { ReportsComponent } from './components/reports/reports.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserManagementComponent },
     // { path: 'parking-zones', component: ParkingZonesComponent },
    //{ path: 'reports', component: ReportsComponent }
    ]
  }
];