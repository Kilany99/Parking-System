import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [CommonModule]
})

export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole = '';
  constructor(private authService: AuthService,private router : Router) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.userRole =this.authService.getUserRole();
  }
    logout(): void {
      this.authService.logout();
      // Redirect the user to the login page or home page
      this.router.navigate(['/auth/login']);
    }
    login(): void {
      this.router.navigate(['/auth/login']);
    }
    register(): void {
      this.router.navigate(['/auth/register']);
    }
    cars(): void { 
      this.router.navigate(['/cars']);
    }
    payments(): void { 
      this.router.navigate(['/payments']);
    }
    parkingZones(): void {
      this.router.navigate(['/parking-zones']);
    }
    reservations(): void {
      this.router.navigate(['/reservations']);
    }
    users(): void {
      this.router.navigate(['/users']);
    }
    dashboard(): void {
      this.router.navigate(['/dashboard']);
    }
    home(): void {
      this.router.navigate(['/']);
    }
    
  
} 