import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ReservationDto } from '../../services/reservation.service';
import { ReservationService } from '../../services/reservation.service';
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
  myReservations: ReservationDto[] = {} as ReservationDto[];
  loading = false;
  showFeeDialog = false;
  calculatedFee = 0;
  reservationForm: FormGroup;
  carId : number = 0;
  sort: any[] = [];

  constructor(private formBuilder: FormBuilder,private reservationService: ReservationService) {
    this.reservationForm = this.formBuilder.group({
      carId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Load initial reservations
    this.loadReservations();
  }

  sortChange(sort: any): void {
    this.sort = sort;
    // Apply sorting to the local data
    this.myReservations = [...this.myReservations].sort((a, b) => {
      const dir = this.sort[0].dir === 'asc' ? 1 : -1;
      const field = this.sort[0].field;
      
      if (a[field as keyof ReservationDto] < b[field as keyof ReservationDto]) return -1 * dir;
      if (a[field as keyof ReservationDto] > b[field as keyof ReservationDto]) return 1 * dir;
      return 0;
    });
  }
  loadReservations(): void {
    this.loading = true;
    // Call your reservation service to get reservations
    this.reservationService.getMyReservations().subscribe({
      next: (reservations) => {
        if (Array.isArray(reservations)) {
          this.myReservations = reservations;
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
    // Implement fee calculation logic
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
    // Implement cancellation logic
    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error cancelling reservation:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.loading = true;
      // Implement create reservation logic
      this.reservationService.createReservation(this.reservationForm.value).subscribe({
        next: (reservation) => {
          this.myReservations.push(reservation);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
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
}
