import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponseDto,LoginDto, RegisterDto } from '../models/DTOs/auth.dto';
import { Environment } from '../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class AuthService {
private apiUrl = Environment.apiUrl;

constructor(private http: HttpClient) { }

login(loginDto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/login`, loginDto);
}

register(registerDto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/register`, registerDto);
}
private tokenKey = 'token';

setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
}

getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
}

removeToken(): void {
    localStorage.removeItem(this.tokenKey);
}

isLoggedIn(): boolean {
    return !!this.getToken();
}

logout(): void {
    this.removeToken();
}

}