import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <div class="dashboard-grid">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>people</mat-icon>
          <mat-card-title>Total Users</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h2>{{ totalUsers }}</h2>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>local_parking</mat-icon>
          <mat-card-title>Active Parking Sessions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h2>{{ activeSessions }}</h2>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>payments</mat-icon>
          <mat-card-title>Today's Revenue</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h2>{{ todayRevenue |"" }}</h2>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    mat-card {
      margin-bottom: 20px;
    }
    h2 {
      font-size: 2rem;
      margin: 20px 0;
      text-align: center;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  activeSessions = 0;
  todayRevenue = 0;

  ngOnInit(): void {
    // TODO: Fetch real data from services
    this.totalUsers = 150;
    this.activeSessions = 25;
    this.todayRevenue = 1250.50;
  }
}
