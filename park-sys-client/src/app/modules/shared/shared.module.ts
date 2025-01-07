import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import other shared modules
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { NavigationComponent } from './navigation/navigation.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { CardModule } from '@progress/kendo-angular-layout';
import { AppModule } from '../../app.module';
import { CarComponent } from '../../components/car/car.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,  // For common Angular directives
    ReactiveFormsModule, 
    GridModule,
    DialogsModule,
    DateInputsModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    DropDownsModule,
    LoaderModule,
    CardModule,],
  exports: [
    CommonModule,
    FormsModule,  // Export FormsModule if needed by other modules
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule,
    GridModule,
    LabelModule,
    DropDownsModule,
    DialogsModule,
    DateInputsModule,
    LoaderModule,
    CardModule,
  ],
})
export class SharedModule {}