import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="container">
      <section class="hero">
        <h1>Smart Parking Solution</h1>
        <p>Find and reserve parking spots with ease</p>
      </section>

      <section class="features">
        <h2>Our Features</h2>
        <div class="feature-grid">
          <mat-card>
            <mat-card-header>
              <mat-icon>search</mat-icon>
              <mat-card-title>Easy Search</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Find available parking spots quickly</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon>qr_code_scanner</mat-icon>
              <mat-card-title>QR Code Access</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Seamless entry and exit with QR codes</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon>payment</mat-icon>
              <mat-card-title>Easy Payment</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Multiple payment options available</p>
            </mat-card-content>
          </mat-card>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .hero {
      text-align: center;
      padding: 60px 0;
      background-color: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    mat-card {
      text-align: center;
    }
    mat-icon {
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
      margin-bottom: 1rem;
    }
  `]
})
export class HomeComponent {}