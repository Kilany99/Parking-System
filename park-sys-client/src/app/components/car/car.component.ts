import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDto } from '../../models/DTOs/car.dto';
import { SharedModule } from '../../modules/shared/shared.module';
import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [SharedModule,FormsModule]
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
    this.selectedCar ={ id: 0, plateNumber: '', model: '', color: '' }; ;
    this.isNew = true;
    this.isDialogOpen = true;
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