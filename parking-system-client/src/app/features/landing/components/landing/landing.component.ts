import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatToolbarModule
  ],
  template: `
    <div class="landing-container">
      <mat-toolbar color="primary">
        <span>Parking System</span>
        <span class="spacer"></span>
        <button mat-button routerLink="/auth/login">Login</button>
        <button mat-raised-button color="accent" routerLink="/auth/register">
          Register
        </button>
      </mat-toolbar>
      
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .landing-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class LandingComponent {}
