import { ParkingZone } from './parking-zone.model';
import { Reservation } from './reservation.model';
import { spotStatus } from './enums/spot-status.enum';
import { spotType } from './enums/spot-type.enum';

export interface ParkingSpot {
    id: number;
    spotNumber: string;
    status: spotStatus;
    Type: spotType;
    Floor: number;
    ReservationId: number;
    ParkingZoneId:number;
    // Navigation properties:
    ParkingZone :ParkingZone;
    CurrentReservation:Reservation;
    Reservations:Reservation[];
  }


