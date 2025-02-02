import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { CardModule } from '@progress/kendo-angular-layout';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ParkingZoneService } from '../../services/parking-zone.service';
import { ReservationService } from '../../services/reservation.service';
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
  activityChartData:any = [];

  availableSpaces: number = 0;
  todayRevenue: number = 0;
  totalReservations: number = 0;
  totalCheckIns: number = 0;
  totalCheckOuts: number = 0;
  occupiedSpaces: number = 0;
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

  constructor(private authService: AuthService, private router: Router,private parkingZoneService:ParkingZoneService,
    private reservationService:ReservationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getToken();
    this.fetchDashboardData();

  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  fetchDashboardData() {
    // Fetch available spaces
    this.parkingZoneService.getZoneStatus(1).subscribe(data => {
      this.availableSpaces = data.distribution.available;
    });
  
    // Fetch today's revenue
    this.reservationService.getTodayRevenue().subscribe(data => {
      this.todayRevenue = data.todayRevenue;
    });
    this.reservationService.getTodayActivity().subscribe(data => {
      this.todayRevenue = data.totalRevenue;
      this.totalReservations = data.totalReservations;
      this.totalCheckIns = data.totalCheckIns;
      this.totalCheckOuts = data.totalCheckOuts;
      this.availableSpaces = data.availableSpaces;
      this.occupiedSpaces = data.occupiedSpaces;
      this.activityChartData = [
      { category: 'Reservations', value: data.totalReservations },
      { category: 'Check-Ins', value: data.totalCheckIns },
      { category: 'Check-Outs', value: data.totalCheckOuts }
    ];
    this.parkingActivity = [
      { time: '08:00', value: data.totalReservations },
      { time: '10:00', value: data.totalCheckIns },
      { time: '12:00', value: data.totalCheckOuts },
    ];

    });
  }
}
/*
    // Fetch parking activity data for chart
    this.parkingService.getParkingActivity().subscribe(data => {
      this.parkingActivity = data;
    });

    // Fetch notifications
    this.parkingService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }
  */
