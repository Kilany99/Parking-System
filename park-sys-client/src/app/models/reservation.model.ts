import { User } from './user.model';
import { Car } from './car.model';
import { ParkingSpot } from './parking-spot.model';
import { Payment } from './payment.model';
import { SessionStatus } from './enums/session-status.enum';

export interface Reservation {
    id: number;
    userId: number;
    parkingSpotId: number;
    carId: number;
    createdAt: Date;
    entryTime?: Date;
    exitTime?: Date;
    totalAmount?: number;
    qrCode: string;
    status: SessionStatus;
    // Navigation properties:
    user?: User;
    car?: Car;
    parkingSpot?: ParkingSpot;
    payment?: Payment;
}

