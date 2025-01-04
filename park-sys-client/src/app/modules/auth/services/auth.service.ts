import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponseDto,LoginDto, RegisterDto } from '../../../models/DTOs/auth.dto';
import { Environment } from '../../../../environments/environment';
import { Router } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable({
providedIn: 'root'
})
export class AuthService {
private apiUrl = Environment.apiUrl;
private tokenKey = 'token';
private authStatusListener = new BehaviorSubject<boolean>(this.isLoggedIn());


constructor(private http: HttpClient) { }

get authStatus$(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }
  login(loginDto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/login`, loginDto).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.authStatusListener.next(true);
        }
      }),
      catchError((error) => {
        throw error;
         })
    );
  }
  register(registerDto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/register`, registerDto).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.authStatusListener.next(true);
        }
      }),
      catchError((error) => {
        // Handle error as needed
        throw error;
      })
    );
  }

setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
}

getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
}

removeToken(): void {
    localStorage.removeItem(this.tokenKey);
}
refreshToken(): Observable<AuthResponseDto> {
    const token = this.getToken();
    return this.http
      .post<AuthResponseDto>(`${this.apiUrl}/auth/refresh-token`, { token })
        tap((response: AuthResponseDto) => {
          if (response && response.token) {
            this.setToken(response.token);
          }
          return response;
        }),
        catchError((error) => {
          // Handle error, possibly logout
          this.logout();
          return of(null);
        });
      
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
logout(): void {
    this.removeToken();
}
private isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<any>(token);
    if (decoded && decoded.exp) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decoded.exp);
      return expirationDate < new Date();
    }
    return true;
  }
}
