import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { AuthService } from '../modules/auth/services/auth.service';
import { ReservationDto,CreateReservationDto } from '../models/DTOs/reservation.dto';


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

  calculateCnxFee(id: number): Observable<number> {
 const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });    return this.http.get<number>(`${this.apiUrl}/${id}/cnx-fee`,{headers});
  }

  cancelReservation(id: number): Observable<ReservationDto> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post<ReservationDto>(`${this.apiUrl}/${id}/cancel`, {}, { headers });
  }
  getActiveReservation(carId: number): Observable<ReservationDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<ReservationDto>(`${this.apiUrl}/car/${carId}/active`,{headers});
  }

  startParking(qrCode: string): Observable<ReservationDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<ReservationDto>(`${this.apiUrl}/start`, { qrCode }, { headers });
  }
  
  endParking(qrCode: string): Observable<ReservationDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<ReservationDto>(`${this.apiUrl}/end`, { qrCode }, { headers });
  }
  getTodayRevenue() : Observable<any>{
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<any>(`${this.apiUrl}/today-revenue`,{headers});

  }
  getTodayActivity(): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get(`${this.apiUrl}/today-activity`,{headers});
  }

  getQRImage(qrCode: string): Observable<{ qrCode: string }> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<{ qrCode: string }>(`${this.apiUrl}/get-qr-image?qrCode=${qrCode}`,{headers});
  }
  private getToken(): string {
    return this.token;
  }
}
