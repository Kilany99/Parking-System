import { Reservation } from './reservation.model';
import { PaymentMethod } from './enums/payment-method.enum';
import { PaymentStatus } from './enums/payment-status.enum';
export interface Payment {
    id: number;
    reservationId: number;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    createdAt: Date;
    //Navigation properties:
    completedAt?: Date;
    reservation?: Reservation;
}



