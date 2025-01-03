import { PaymentMethod } from '../enums/payment-method.enum';   
import { PaymentStatus } from '../enums/payment-status.enum';
export interface ProcessPaymentDto {
    reservationId: number;
    amount: number;
    method: PaymentMethod;
}

export interface PaymentDto {
    id: number;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    createdAt: Date;
    completedAt: Date | null;
}