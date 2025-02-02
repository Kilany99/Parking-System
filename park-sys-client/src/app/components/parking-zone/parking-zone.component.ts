import { Component, OnInit } from '@angular/core';
import { ParkingZoneService } from '../../services/parking-zone.service';
import { ParkingSpotDto, ParkingZoneDto, ParkingZoneStatusDto } from '../../models/DTOs/parking-zone.dto';
import { SharedModule } from '../../modules/shared/shared.module';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { spotStatus } from '../../models/enums/spot-status.enum';

@Component({
  selector: 'app-parking-zone',
  templateUrl: './parking-zone.component.html',
  imports: [SharedModule],
  styleUrls: ['./parking-zone.component.scss'],
})
export class ParkingZoneComponent implements OnInit {
  parkingZones: ParkingZoneDto[] = [];
  selectedZoneId: number | null = null;
  zoneStatus: ParkingZoneStatusDto | null = null;
  availableSpots: ParkingSpotDto[] = [];
  sort: any[] = [];
  selectedStatus: spotStatus | null = null;
  SpotStatus = {
    Available: 0,
    Occupied: 1,
    Reserved : 2,
    Maintenance: 3,
    OutOfService: 4
  };
  constructor(private parkingZoneService: ParkingZoneService,@Inject(PLATFORM_ID) private platformId: any) {}

  sortChange(sort: any): void {
      this.sort = sort;
      // Apply sorting to the local data
      this.availableSpots = [...this.availableSpots].sort((a, b) => {
        const dir = this.sort[0].dir === 'asc' ? 1 : -1;
        const field = this.sort[0].field;
        
        if (a[field as keyof ParkingSpotDto] < b[field as keyof ParkingSpotDto]) return -1 * dir;
        if (a[field as keyof ParkingSpotDto] > b[field as keyof ParkingSpotDto]) return 1 * dir;
        return 0;
      });
    }

    sortChange2(sort: any): void {
      this.sort = sort;
      // Apply sorting to the local data
      this.parkingZones = [...this.parkingZones].sort((a, b) => {
        const dir = this.sort[0].dir === 'asc' ? 1 : -1;
        const field = this.sort[0].field;
        
        if (a[field as keyof ParkingZoneDto] < b[field as keyof ParkingZoneDto]) return -1 * dir;
        if (a[field as keyof ParkingZoneDto] > b[field as keyof ParkingZoneDto]) return 1 * dir;
        return 0;
      });
    }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.loadParkingZones();
    }
  }

  loadParkingZones(): void {
    this.parkingZoneService.getParkingZones().subscribe({
      next: (data) => {
        this.parkingZones = data;
      },
      error: (error) => {
        console.error('Error fetching parking zones:', error);
      }
    });
  }


selectZone(id: number): void {
  this.selectedZoneId = id;
  this.loadZoneStatus(id);
  this.loadAvailableSpots(id,spotStatus.Available); //initially load available spots
}

loadZoneStatus(id: number): void {
  this.parkingZoneService.getZoneStatus(id).subscribe({
    next: (status) => {
      this.zoneStatus = status;
    },
    error: (error) => {
      console.error('Error fetching zone status:', error);
    }
  });
}

loadAvailableSpots(id: number,status:spotStatus ): void {
  this.parkingZoneService.getSpots(id,status).subscribe({
    next: (spots) => {
      this.availableSpots = spots;
    },
    error: (error) => {
      console.error('Error fetching available spots:', error);
    }
  });
}

loadAllSpots(id: number): void {
  this.parkingZoneService.getAllSpots(id).subscribe({
    next: (spots) => {
      this.availableSpots = spots;
    },
    error: (error) => {
      console.error('Error fetching all spots:', error);
    }
  });
}
createZone(zoneData: any): void {
  this.parkingZoneService.createParkingZone(zoneData).subscribe({
    next: (newZone) => {
      this.parkingZones.push(newZone);
    },
    error: (error) => {
      console.error('Error creating parking zone:', error);
    }
  });
}
onStatusChange(): void {
  if (this.selectedZoneId !== null) {
    if (this.selectedStatus === null) {
      // If "All" is selected, load all spots without filtering by status
      this.loadAllSpots(this.selectedZoneId);
    } else {
      // Otherwise, load spots based on the selected status
      this.loadAvailableSpots(this.selectedZoneId, this.selectedStatus);
    }
  }
}
getFloors(availableByFloor: { [floorNumber: number]: number } | null): { floorNumber: number; spots: number }[] {
  if (!availableByFloor) return []; // Handle null case
  
  return Object.keys(availableByFloor).map((key: string) => ({
      floorNumber: parseInt(key, 10), // Convert string key to number
      spots: availableByFloor[+key as keyof typeof availableByFloor] // Explicit type assertion
  })).sort((a, b) => a.floorNumber - b.floorNumber); // Sort floors in ascending order
}


getStatusName(status: number): string {
  switch (status) {
    case this.SpotStatus.Available: return 'Available';
    case this.SpotStatus.Occupied: return 'Occupied';
    case this.SpotStatus.Reserved: return 'Reserved';
    case this.SpotStatus.Maintenance: return 'Maintenance';
    case this.SpotStatus.OutOfService: return 'Out of Service';
    default: return 'Unknown';
  }
}
}