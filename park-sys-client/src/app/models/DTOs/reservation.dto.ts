import { CarDto } from './car.dto';
import { ParkingSpotDto } from './parking-zone.dto';
import { SessionStatus } from '../enums/session-status.enum';
export interface CreateReservationDto {
    carId: number;
    parkingSpotId: number;
}

export interface ReservationDto {
    id: number;
    createdAt: Date;
    entryTime?: Date;
    exitTime?: Date;
    totalAmount?: number;
    qrCode: string;
    status: SessionStatus;
    car: CarDto;
    parkingSpot: ParkingSpotDto;
}

