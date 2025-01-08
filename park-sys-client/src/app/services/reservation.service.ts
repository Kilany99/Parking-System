import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { AuthService } from '../modules/auth/services/auth.service';
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
  private apiUrl = `${Environment.apiUrl}/reservation`;
  private token: any;
  constructor(private http: HttpClient,private authService:AuthService) {
    this.token = authService.getToken();
   }

  createReservation(dto: CreateReservationDto): Observable<ReservationDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<ReservationDto>(this.apiUrl, dto,{headers});
  }

 
  getMyReservations(): Observable<ReservationDto[]> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<ReservationDto[]>(`${this.apiUrl}/me`,{headers});
  }

  calculateFee(id: number): Observable<number> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<number>(`${this.apiUrl}/${id}/fee`,{headers});
  }

  cancelReservation(id: number): Observable<ReservationDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<ReservationDto>(`${this.apiUrl}/${id}/cancel`,{headers})
  }

  getActiveReservation(carId: number): Observable<ReservationDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<ReservationDto>(`${this.apiUrl}/car/${carId}/active`,{headers});
  }
  private getToken(): string {
    return this.token;
  }
}
