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

  constructor(private authService: AuthService,private router : Router) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
    logout(): void {
      this.authService.logout();
      // Redirect the user to the login page or home page
      this.router.navigate(['/login']);
    }
  
} 