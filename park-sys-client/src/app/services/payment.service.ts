import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../../environments/environment';
import { PaymentDto, ProcessPaymentDto } from '../models/DTOs/payment.dto';
import { AuthService } from '../modules/auth/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${Environment.apiUrl}/payment`;
  private token: any;
  constructor(private http: HttpClient, authService:AuthService) {
     this.token = authService.getToken();
  }
   
  // Process a payment
  processPayment(dto: ProcessPaymentDto): Observable<PaymentDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post<PaymentDto>(this.apiUrl, dto,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Get payment details by ID
  getPaymentDetails(id: number): Observable<PaymentDto> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<PaymentDto>(`${this.apiUrl}/${id}`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Get user's payments
  getMyPayments(): Observable<PaymentDto[]> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/my-payments`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private getToken(): string {
    return this.token;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
