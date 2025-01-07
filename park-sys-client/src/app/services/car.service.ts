import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { Environment } from '../../environments/environment';
import { CarDto, CreateCarDto, UpdateCarDto } from '../models/DTOs/car.dto';
import { AuthService } from '../modules/auth/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = `${Environment.apiUrl}/car`;
  private token: any;


  constructor(private http: HttpClient, authService:AuthService) {
       this.token = authService.getToken();}

  // Get current user's cars
  getMyCars(): Observable<CarDto[]> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<CarDto[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new car
  createCar(carDto: CreateCarDto): Observable<CarDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<CarDto>(this.apiUrl, carDto, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Update a car
  updateCar(id: number, carDto: UpdateCarDto): Observable<CarDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.put<CarDto>(`${this.apiUrl}/${id}`, carDto, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a car
  deleteCar(id: number): Observable<void> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    console.error('An error occurred:', error);
    return throwError(() => error);
  }

private getToken(): string {
    return this.token;
  }
}
