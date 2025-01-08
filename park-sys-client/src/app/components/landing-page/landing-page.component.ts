import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@progress/kendo-angular-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonsModule,
    LayoutModule,
    IndicatorsModule,
    RouterModule,
    IconsModule
  ],
})
export class LandingPageComponent {

  constructor(private router:Router,private authService: AuthService) { }

  redirect(): void {  
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/reservations']);
    }
    else{
      this.router.navigate(['/auth/login']);
    }
  
}

}