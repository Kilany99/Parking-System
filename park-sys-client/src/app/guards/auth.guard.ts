import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole(); 

    if (!isLoggedIn) {
      return this.router.createUrlTree(['/auth/login']); // Redirect to login if not logged in
    }

    const requiredRoles: string[] = next.data['roles']; // Get roles from route data
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return this.router.createUrlTree(['/']); // Redirect unauthorized users
    }

    return true; // Allow access if conditions are met
  }
}
