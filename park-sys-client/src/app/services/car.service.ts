import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { Environment } from '../../environments/environment';
import { CarDto, CreateCarDto, UpdateCarDto } from '../models/DTOs/car.dto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = `${Environment.apiUrl}/car`;

  constructor(private http: HttpClient) {}

  // Get current user's cars
  getMyCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new car
  createCar(carDto: CreateCarDto): Observable<CarDto> {
    return this.http.post<CarDto>(this.apiUrl, carDto).pipe(
      catchError(this.handleError)
    );
  }

  // Update a car
  updateCar(id: number, carDto: UpdateCarDto): Observable<CarDto> {
    return this.http.put<CarDto>(`${this.apiUrl}/${id}`, carDto).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a car
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
