import { Component } from '@angular/core';
import { PaymentDto } from '../../models/DTOs/payment.dto';
import { ProcessPaymentDto } from '../../models/DTOs/payment.dto';
import { PaymentService } from '../../services/payment.service';
import { share } from 'rxjs';
import { SharedModule } from '../../modules/shared/shared.module';
import { PaymentMethod } from '../../models/enums/payment-method.enum';
import { CardModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
@Component({
  selector: 'app-payment',
  imports: [SharedModule, CardModule, ButtonsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
payment: PaymentDto = {} as PaymentDto;
payments: PaymentDto[] = [];
loading = false;
error: string | null = null;
paymentMethods: PaymentMethod[] = [PaymentMethod.Cash, PaymentMethod.CreditCard, PaymentMethod.DebitCard, PaymentMethod.MobilePay];
paymentData: ProcessPaymentDto = {'reservationId': 0, 'method': 0, 'amount': 0}; 


constructor(private paymentService: PaymentService) {
  
}

processPayment(paymentData: ProcessPaymentDto): void {
  this.loading = true;
  this.error = null;
  this.paymentService.processPayment(paymentData).subscribe({
    next: (response) => {
      this.payment = response;
      this.loading = false;
    },
    error: (error) => {
      this.error = error.message;
      this.loading = false;
    }
  });
}

getPaymentDetails(id: number): void {
  this.loading = true;
  this.paymentService.getPaymentDetails(id).subscribe({
    next: (response) => {
      this.payment = response;
      this.loading = false;
    },
    error: (error) => {
      this.error = error.message;
      this.loading = false;
    }
  });
}

loadMyPayments(): void {
  this.loading = true;
  this.paymentService.getMyPayments().subscribe({
    next: (response) => {
      this.payments = response;
      this.loading = false;
    },
    error: (error) => {
      this.error = error.message;
      this.loading = false;
    }
  });
}

}