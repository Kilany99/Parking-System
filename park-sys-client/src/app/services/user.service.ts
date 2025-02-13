import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Environment } from '../../environments/environment';
import { UpdateUserDto, UserDto ,CreateUserDto} from '../models/DTOs/user.dto';
import { AuthService } from '../modules/auth/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${Environment.apiUrl}/user`; 
  private token: any;
  constructor(private http: HttpClient,authService:AuthService) {
    this.token = authService.getToken();
  }

  // Get all users (Admin functionality)
  getUsers(): Observable<UserDto[]> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}`};
    return this.http.get<User[]>(`${this.apiUrl}/getall`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single user by ID
  getUser(id: number): Observable<UserDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<User>(`${this.apiUrl}/${id}`,{headers}).pipe(
      catchError(this.handleError)
    );
  }
  createUser(user: CreateUserDto): Observable<UserDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<UserDto>(`${this.apiUrl}/create`, user,{headers}).pipe(catchError(this.handleError));
  }
  

  // Update user information
  updateUser(id: number, updateUserDto:UpdateUserDto): Observable<UserDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.put<User>(`${this.apiUrl}/${id}`, updateUserDto,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a user (Admin functionality)
  deleteUser(id: number): Observable<void> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Handle any errors from the API
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  getToken(): string {
    return this.token;
  }
}