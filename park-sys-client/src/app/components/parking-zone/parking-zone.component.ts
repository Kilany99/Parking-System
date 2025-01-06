import { Component, OnInit } from '@angular/core';
import { ParkingZoneService } from '../../services/parking-zone.service';
import { ParkingSpotDto, ParkingZoneDto, ParkingZoneStatusDto } from '../../models/DTOs/parking-zone.dto';
import { share } from 'rxjs';
import { SharedModule } from '../../modules/shared/shared.module';

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
  
  constructor(private parkingZoneService: ParkingZoneService) {}

  ngOnInit(): void {
    this.loadParkingZones();
  }

  loadParkingZones(): void {
    this.parkingZoneService.getParkingZones().subscribe(
      (data) => {
        this.parkingZones = data;
      },
      (error) => {
        console.error('Error fetching parking zones:', error);
      }
    );
  }


selectZone(id: number): void {
  this.selectedZoneId = id;
  this.loadZoneStatus(id);
  this.loadAvailableSpots(id);
}

loadZoneStatus(id: number): void {
  this.parkingZoneService.getZoneStatus(id).subscribe(
    (status) => {
      this.zoneStatus = status;
    },
    (error) => {
      console.error('Error fetching zone status:', error);
    }
  );
}

loadAvailableSpots(id: number): void {
  this.parkingZoneService.getAvailableSpots(id).subscribe(
    (spots) => {
      this.availableSpots = spots;
    },
    (error) => {
      console.error('Error fetching available spots:', error);
    }
  );
}

createZone(zoneData: any): void {
  this.parkingZoneService.createParkingZone(zoneData).subscribe(
    (newZone) => {
      this.parkingZones.push(newZone);
    },
    (error) => {
      console.error('Error creating parking zone:', error);
    }
  );
}
}