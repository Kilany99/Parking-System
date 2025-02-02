import { spotStatus } from '../enums/spot-status.enum';
import { spotType } from '../enums/spot-type.enum';
import { Reservation } from '../reservation.model';
import { CarDto } from './car.dto';
import { ReservationDto } from './reservation.dto';
export interface CreateParkingZoneDto {
    name: string;
    totalFloors: number;
    spotsPerFloor: number;
    description?: string;
    hourlyRate: number;
}

export interface ParkingZoneDto {
    id: number;
    name: string;
    totalFloors: number;
    spotsPerFloor: number;
    isFull: boolean;
    hourlyRate: number;
}

export interface ParkingZoneStatusDto {
    zoneId: number;
    zoneName: string;
    totalSpots: number;
    availableSpots: number;
    hourlyRate: number;
    isFull: boolean;
    distribution: ParkingSpotDistributionDto;
}

export interface ParkingSpotDistributionDto {
    available: number;
    occupied: number;
    reserved: number;
    maintenance: number;
    availableByFloor: { [floorNumber: number]: number };
}

export interface ParkingSpotDto {
    id: number;
    spotNumber: string;
    floor: number;
    status: spotStatus;
    type: spotType;
    reservation: ReservationDto;
    parkingZone: ParkingZoneDto    
}


