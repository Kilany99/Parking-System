import { Component, OnInit } from '@angular/core';
import { ParkingZoneService } from '../../services/parking-zone.service';
import { ParkingSpotDto, ParkingZoneDto, ParkingZoneStatusDto } from '../../models/DTOs/parking-zone.dto';
import { SharedModule } from '../../modules/shared/shared.module';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
  this.loadAvailableSpots(id);
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

loadAvailableSpots(id: number): void {
  this.parkingZoneService.getAvailableSpots(id).subscribe({
    next: (spots) => {
      this.availableSpots = spots;
    },
    error: (error) => {
      console.error('Error fetching available spots:', error);
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
}