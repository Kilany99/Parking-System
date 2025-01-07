import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ParkingZone } from '../models/parking-zone.model';
import { Environment } from '../../environments/environment';
import { AuthService } from '../modules/auth/services/auth.service';
import { ParkingZoneDto, ParkingZoneStatusDto, ParkingSpotDto } from '../models/DTOs/parking-zone.dto';

@Injectable({
  providedIn: 'root',
})
export class ParkingZoneService {
  private apiUrl = `${Environment.apiUrl}/parkingzone`;
  private token: any;
  constructor(private http: HttpClient,authService:AuthService) {
    this.token = authService.getToken();
  }

  // Get all parking zones
  getParkingZones(): Observable<ParkingZoneDto[]> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<ParkingZoneDto[]>(this.apiUrl,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Get zone status
  getZoneStatus(id: number): Observable<ParkingZoneStatusDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };

    return this.http.get<ParkingZoneStatusDto>(`${this.apiUrl}/${id}/status`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Get available spots in a zone
  getAvailableSpots(id: number): Observable<ParkingSpotDto[]> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<ParkingSpotDto[]>(`${this.apiUrl}/${id}/available-spots`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new parking zone
  createParkingZone(createDto: any): Observable<ParkingZoneDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<ParkingZoneDto>(this.apiUrl, createDto,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  private getToken(): string {
    return this.token;
  }
}
