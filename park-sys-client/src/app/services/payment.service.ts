import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../../environments/environment';
import { PaymentDto, ProcessPaymentDto } from '../models/DTOs/payment.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${Environment.apiUrl}/payment`;

  constructor(private http: HttpClient) { }

  // Process a payment
  processPayment(dto: ProcessPaymentDto): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(this.apiUrl, dto).pipe(
      catchError(this.handleError)
    );
  }

  // Get payment details by ID
  getPaymentDetails(id: number): Observable<PaymentDto> {
    return this.http.get<PaymentDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get user's payments
  getMyPayments(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
