// src/app/features/admin/components/admin-layout/admin-layout.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="admin-container">
      <mat-sidenav #sidenav mode="side" opened class="admin-sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          
          <a mat-list-item routerLink="users" routerLinkActive="active">
            <mat-icon matListItemIcon>people</mat-icon>
            <span>Users</span>
          </a>
          
          <a mat-list-item routerLink="parking-zones" routerLinkActive="active">
            <mat-icon matListItemIcon>local_parking</mat-icon>
            <span>Parking Zones</span>
          </a>
          
          <a mat-list-item routerLink="reports" routerLinkActive="active">
            <mat-icon matListItemIcon>assessment</mat-icon>
            <span>Reports</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Admin Dashboard</span>
          <span class="spacer"></span>
          <button mat-icon-button >
            <mat-icon>account_circle</mat-icon>
          </button>
        </mat-toolbar>

        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <mat-menu >
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .admin-container {
      height: 100vh;
    }
    .admin-sidenav {
      width: 250px;
    }
    .admin-content {
      padding: 20px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .active {
      background-color: rgba(0,0,0,0.1);
    }
  `]
})
export class AdminLayoutComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
