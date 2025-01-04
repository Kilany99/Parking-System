import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    // Send the newly created request
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/login')) {
          // Attempt to refresh token
          return this.authService.refreshToken().pipe(
            switchMap((response) => {
              if (response && response.token) {
                // Retry the failed request with the new token
                const newToken = response.token;
                const newAuthReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newToken}`),
                });
                return next.handle(newAuthReq);
              }
              // If refresh fails, logout
              this.authService.logout();
              return throwError(error);
            }),
            catchError((refreshError) => {
              // If refresh fails, logout
              this.authService.logout();
              return throwError(refreshError);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}