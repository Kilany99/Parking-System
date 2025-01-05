import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

export interface ReservationDto {
  id: number;
  // Add other properties as needed
}

export interface CreateReservationDto {
  carId: number;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${Environment.apiUrl}/api/reservation`;

  constructor(private http: HttpClient) { }

  createReservation(dto: CreateReservationDto): Observable<ReservationDto> {
    return this.http.post<ReservationDto>(this.apiUrl, dto);
  }

 
  getMyReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(`${this.apiUrl}/me`);
  }

  calculateFee(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/fee`);
  }

  cancelReservation(id: number): Observable<ReservationDto> {
    return this.http.post<ReservationDto>(`${this.apiUrl}/${id}/cancel`, {});
  }

  getActiveReservation(carId: number): Observable<ReservationDto> {
    return this.http.get<ReservationDto>(`${this.apiUrl}/car/${carId}/active`);
  }
}
