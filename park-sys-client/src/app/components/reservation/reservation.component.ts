import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ReservationService } from '../../services/reservation.service';
import { ReservationDto } from '../../models/DTOs/reservation.dto';
import { CarService } from '../../services/car.service';
import { ParkingZoneService } from '../../services/parking-zone.service';
import { CarDto } from '../../models/DTOs/car.dto';
import { ParkingZoneDto } from '../../models/DTOs/parking-zone.dto';
import { ParkingSpot } from '../../models/parking-spot.model';
import { ParkingSpotDto } from '../../models/DTOs/parking-zone.dto';
import { spotStatus } from '../../models/enums/spot-status.enum';
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    ButtonsModule,
    DialogModule,
    LoaderModule,
    InputsModule,
    LabelModule,
    ReactiveFormsModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  myReservations: ReservationDto[] = [];
  loading = false;
  showFeeDialog = false;
  showCnxDialog = false;
  selectedCnxResId : any = null;
  calculatedFee = 0;
  reservationForm: FormGroup;
  sort: any[] = [];
  availableCars: CarDto[] = [];
  availableParkingZones: ParkingZoneDto[] = [];
  availableParkingSpots : ParkingSpotDto [] = [];
  selectedSpot: any = null;
  errorMessage: string = '';
  errorMessageResList:string = '';
  
  constructor(private formBuilder: FormBuilder,private reservationService: ReservationService,private carService: CarService
    ,private parkingZoneService: ParkingZoneService) {
    this.reservationForm = this.formBuilder.group({
      carId: ['', [Validators.required, Validators.min(1)]],
      parkingSpotId: ['', [Validators.required, Validators.min(1)]],
      parkingZoneId: ['', [Validators.required, Validators.min(1)]],
    });
  }
  

  ngOnInit(): void {
    // Load initial reservations
    this.loadReservations();

    this.getAvailableCars();

    this.getParkingZones();
  }

  sortChange(sort: any): void {
    this.sort = sort;
    // Apply sorting to the local data
    this.myReservations = [...this.myReservations].sort((a, b) => {
      const dir = this.sort[0].dir === 'asc' ? 1 : -1;
      const field = this.sort[0].field;
      
      const aValue = a[field as keyof ReservationDto] ?? '';
      const bValue = b[field as keyof ReservationDto] ?? '';
      if (aValue < bValue) return -1 * dir;
      if (aValue > bValue) return 1 * dir;
      return 0;
    });
  }
  loadReservations(): void {
    this.loading = true;
    // Call reservation service to get reservations
    this.reservationService.getMyReservations().subscribe({
      next: (reservations) => {
        if (Array.isArray(reservations)) {
          this.myReservations = reservations;
          this.loadQRCodeImages();
        } else {
          console.error('Invalid response format');
          this.myReservations = [];
        }
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.myReservations = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  calculateReservationFee(id: number): void {
    this.loading = true;
    this.reservationService.calculateFee(id).subscribe({
      next: (fee) => {
        this.calculatedFee = fee;
      },
      error: (error) => {
        console.error('Error calculating fee:', error);
      },
      complete: () => {
        this.showFeeDialog = true;
        this.loading = false;
      }
    });
  
  }

  cancelReservation(id: number): void {
    this.loading = true;
    this.selectedCnxResId = id;
    this.reservationService.calculateCnxFee(id).subscribe({
      next: (fee) => {
        this.calculatedFee = fee;
      },
      error: (error) => {
        console.error('Error calculating fee:', error);
      },
      complete: () => {
        this.showCnxDialog = true;
        this.loading = false;
      }
   });
   
  }
  onCnxButtonClick(id: number):void{
    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error cancelling reservation:', error);
        
        if (error.error?.error) {
          this.errorMessageResList = error.error.error;
        } else {
          this.errorMessageResList = 'An unexpected error occurred. Please try again later.';
        }
      },
      complete: () => {
        this.loading = false;
        this.closeCnxDialog();
      }
    });
  }

  createReservation(): void {
    if (this.reservationForm.valid) {
      this.loading = true;
      this.reservationService.createReservation(this.reservationForm.value).subscribe({
        next: (reservation) => {
          this.myReservations.push(reservation);
        },
        error: (error) => {
          if (error.error && error.error.error) {
          console.error('Error creating reservation:', error);
          this.errorMessage = error.error.error;
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  closeFeeDialog(): void {
  
    this.showFeeDialog = false;
  }
  closeCnxDialog():void {
    this.calculatedFee = 0;
    this.selectedCnxResId = null;
    this.showCnxDialog = false;
  }

  getAvailableCars(): void {
    this.loading = true;
    this.carService.getMyCars().subscribe({
      next: (cars) => {
        if (Array.isArray(cars)) {
          this.availableCars = cars;
        } else {
          console.error('Invalid response format');
          this.availableCars = [];
        }
      },
      error: (error) => {
        console.error('Error loading cars:', error);
        this.availableCars = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  getParkingZones(): void {
    this.loading = true;
    this.parkingZoneService.getParkingZones().subscribe({
      next: (parkingZones) => {
        if (Array.isArray(parkingZones)) {
          this.availableParkingZones = parkingZones;
        } else {
          console.error('Invalid response format');
          this.availableParkingZones = [];
        }
      },
      error: (error) => {
        console.error('Error loading parking zones:', error);
        this.availableParkingZones = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  } 
  getParkingSpots(parkingZoneId: number): void {
    this.loading = true;
    this.parkingZoneService.getSpots(parkingZoneId,spotStatus.Available).subscribe({
      next: (parkingSpots) => {
        this.availableParkingSpots = parkingSpots;  // Store the available spots
      },
      error: (error) => {
        console.error('Error loading parking spots:', error);
        this.availableParkingSpots = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  onParkingZoneChange(): void {
    const selectedParkingZoneId = this.reservationForm.get('parkingZoneId')?.value;
    console.log('Selected Parking Zone ID:', selectedParkingZoneId); // Debugging log
    if (selectedParkingZoneId) {
      this.getParkingSpots(selectedParkingZoneId);  // Load parking spots for the selected zone
    }
  }
  onSpotClick(spot: ParkingSpotDto): void {
    // Set the selected spot to the form control
    this.reservationForm.patchValue({
      parkingSpotId: spot.id
    });
  }
  getStatusColor(status: number): string {
    switch (status) {
        case 0: return 'orange'; // Reserved
        case 1: return 'green';  // Active
        case 2: return 'grey';   // Completed
        case 3: return 'red';    // Cancelled
        default: return 'black'; // Default color
    }
}

loadQRCodeImages(): void {
  this.myReservations.forEach((reservation) => {
    if (reservation.qrCode) {
      this.reservationService.getQRImage(reservation.qrCode).subscribe({
        next: (response) => {
          reservation.qrCode = response.qrCode; // Store the Base64 QR image
        },
        error: () => {
          reservation.qrCode = ''; // Fallback for errors
        },
      });
    }
  });
}
downloadQR(qrCodeImage: string, reservationId: number): void {
  if (!qrCodeImage) {
    console.error("QR code image not available.");
    return;
  }

  // Convert base64 string to a Blob
  const byteCharacters = atob(qrCodeImage.split(',')[1]); // Remove data:image/png;base64
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });

  // Create a temporary link to download the blob
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `QR_Code_Reservation_${reservationId}.png`; // File name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


get groupedSpots() {
  return this.availableParkingSpots.reduce((acc: { [key: string]: any[] }, spot) => {
    const match = spot.spotNumber.match(/F(\d+)S\d+/);
    if (!match) return acc; // Handle cases where regex doesn't match

    const floor = match[1]; // Extract floor number

    if (!acc[floor]) acc[floor] = []; // Ensure array exists
    acc[floor].push(spot); // Add spot to the corresponding floor

    return acc;
  }, {}); // Initialize acc as an empty object
}
isSelected(spot: any): boolean {
  return this.selectedSpot?.spotNumber === spot.spotNumber;
}


}
