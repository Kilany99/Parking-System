
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDto } from '../../models/DTOs/car.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  standalone: true,

  imports: [
        CommonModule,
        FormsModule,
        GridModule, // Import GridModule here
        InputsModule,
        DialogsModule,
        ButtonsModule,
        FormsModule,
        ReactiveFormsModule,
        DropDownListModule,
  ],
})  
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  selectedCar ={ id: 0, plateNumber: '', model: '', color: '' }; ;
  isNew: boolean = false;
  isDialogOpen: boolean = false;
  columnWidth: number = 100;

  constructor(private carService: CarService) 
  { }

  ngOnInit(): void {
    this.loadCars();


  }

  loadCars(): void {
    this.carService.getMyCars().subscribe(
      (data) => {
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  addCar(): void {
    this.selectedCar = { id: 0, plateNumber: '', model: '', color: '' };
    this.isNew = true;
    this.isDialogOpen = true;
  }
  submitCar(): void {
    if (this.isNew) {
      this.carService.createCar(this.selectedCar).subscribe(
        (newCar) => {
          this.cars.push(newCar);
          this.isDialogOpen = false;
        },
        (error) => {
          console.error('Error adding car:', error);
        }
      );
    } else {
      this.carService.updateCar(this.selectedCar.id, this.selectedCar).subscribe(
        () => {
          this.loadCars();
          this.isDialogOpen = false;
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
    }
  }
  editCar(car: CarDto): void {
    this.selectedCar = { ...car };
    this.isNew = false;
    this.isDialogOpen = true;
  }

  saveCar(): void {
    if (this.isNew) {
      this.carService.createCar(this.selectedCar!).subscribe(
        () => {
          this.loadCars();
          this.isDialogOpen = false;
        },
        (error) => {
          console.error('Error creating car:', error);
        }
      );
    } else {
      this.carService.updateCar(this.selectedCar!.id, this.selectedCar!).subscribe(
        () => {
          this.loadCars();
          this.isDialogOpen = false;
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
    }
  }

  deleteCar(car: CarDto): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(car.id).subscribe(
        () => {
          this.loadCars();
        },
        (error) => {
          console.error('Error deleting car:', error);
        }
      );
    }
  }

  cancel(): void {
    this.selectedCar ={ id: 0, plateNumber: '', model: '', color: '' }; ;
    ;
    this.isDialogOpen = false;
  }
}