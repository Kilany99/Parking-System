import { ParkingSpot } from './parking-spot.model';

export interface ParkingZone {
    id: number;
    name: string;
    totalFloors: number;
    spotsPerFloor: number;
    hourlyRate: number;
    description: string;
    isFull: boolean;
    // Navigation properties:
    parkingSpots: ParkingSpot[];

   
}


