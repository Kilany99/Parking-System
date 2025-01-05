import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Environment } from '../../environments/environment';
import { UpdateUserDto, UserDto } from '../models/DTOs/user.dto';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${Environment.apiUrl}/user`; // Adjust based on your API endpoint

  constructor(private http: HttpClient) {}

  // Get all users (Admin functionality)
  getUsers(): Observable<UserDto[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single user by ID
  getUser(id: number): Observable<UserDto> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  

  // Update user information
  updateUser(id: number, updateUserDto:UpdateUserDto): Observable<UserDto> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, updateUserDto).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a user (Admin functionality)
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle any errors from the API
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}