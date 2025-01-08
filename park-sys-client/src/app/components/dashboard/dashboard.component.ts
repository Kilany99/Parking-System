import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { CardModule } from '@progress/kendo-angular-layout';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  providers: [CurrencyPipe, DatePipe],
  imports: [GridModule, CardModule, ChartsModule, ListViewModule, CommonModule]
})
export class DashboardComponent implements OnInit {
  user: any;
  quickActions: any[] = [
    { icon: 'k-i-plus', action: 'Add Vehicle' },
    { icon: 'k-i-search', action: 'Find Space' },
    { icon: 'k-i-calendar', action: 'Reservations' }
  ];
  
  availableSpaces: number = 0;
  todayRevenue: number = 0;
  
  parkingActivity: any[] = [
    { time: '08:00', value: 10 },
    { time: '10:00', value: 15 },
    { time: '12:00', value: 20 },
    { time: '14:00', value: 18 }
  ];
  
  notifications: any[] = [
    { icon: 'k-i-info', message: 'New vehicle entered', time: new Date() },
    { icon: 'k-i-warning', message: 'Space A1 occupied', time: new Date() }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getToken();
    // Add initialization logic for:
    // - Fetching available spaces
    // - Calculating today's revenue
    // - Getting parking activity data
    // - Loading notifications
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}