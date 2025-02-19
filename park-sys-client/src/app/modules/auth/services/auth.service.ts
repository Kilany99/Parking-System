import { Injectable ,Inject,PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponseDto,ForgotPasswordDto,LoginDto, RegisterDto, ResetPasswordDto } from '../../../models/DTOs/auth.dto';
import { Environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
providedIn: 'root'
})
export class AuthService {
private apiUrl = Environment.apiUrl;
private tokenKey = 'token';
private role = 'role';
private authStatusListener = new BehaviorSubject<boolean>(this.isLoggedIn());
private isBrowser: boolean;
constructor(
  private http: HttpClient,
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
) {
  this.isBrowser = isPlatformBrowser(this.platformId);

  if (this.isBrowser) {
    this.authStatusListener = new BehaviorSubject<boolean>(this.isLoggedIn());
  } else {
    this.authStatusListener = new BehaviorSubject<boolean>(false);
  }
}

get authStatus$(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }
  login(loginDto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/login`, loginDto).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.setRole(response.role);
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

  forgotPassword(dto: ForgotPasswordDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { dto }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  resetPassword(dto:ResetPasswordDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, { dto }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }
  setRole(role: string): void {
    if (this.isBrowser) {
      localStorage.setItem('role', role);
    }
  }
getToken(): string | null {
  if (this.isBrowser) {
    return localStorage.getItem(this.tokenKey);
  }
  return null;
}

removeToken(): void {
    if(this.isBrowser)
    localStorage.removeItem(this.tokenKey);
}
removeRole():void{
  if(this.isBrowser)
    localStorage.removeItem(this.role);
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
    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        return !this.isTokenExpired(token);
      }
    }
    return false;
  }

  getDecodedToken(): any {
    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        return jwtDecode(token);
      } 
    }
    return null;
  }
  logout(): void {
    this.removeToken();
    this.removeRole();
    this.authStatusListener.next(false);
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
  public getUserRole(): string {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return "";
    }
    
    // Check for both possible keys:
    return decodedToken.role ||
           decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
  }
}
