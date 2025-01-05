import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ParkingZone } from '../models/parking-zone.model';
import { Environment } from '../../environments/environment';
import { ParkingZoneDto, ParkingZoneStatusDto, ParkingSpotDto } from '../models/DTOs/parking-zone.dto';

@Injectable({
  providedIn: 'root',
})
export class ParkingZoneService {
  private apiUrl = `${Environment.apiUrl}/parkingzone`;

  constructor(private http: HttpClient) {}

  // Get all parking zones
  getParkingZones(): Observable<ParkingZoneDto[]> {
    return this.http.get<ParkingZoneDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get zone status
  getZoneStatus(id: number): Observable<ParkingZoneStatusDto> {
    return this.http.get<ParkingZoneStatusDto>(`${this.apiUrl}/${id}/status`).pipe(
      catchError(this.handleError)
    );
  }

  // Get available spots in a zone
  getAvailableSpots(id: number): Observable<ParkingSpotDto[]> {
    return this.http.get<ParkingSpotDto[]>(`${this.apiUrl}/${id}/available-spots`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new parking zone
  createParkingZone(createDto: any): Observable<ParkingZoneDto> {
    return this.http.post<ParkingZoneDto>(this.apiUrl, createDto).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
