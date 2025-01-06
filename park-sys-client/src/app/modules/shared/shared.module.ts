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
@NgModule({
  declarations: [],
  imports: [CommonModule,NavigationComponent,CardModule,ButtonsModule],
  exports: [
    FormsModule,
    LoaderModule,
    CommonModule,
    GridModule,
    DialogsModule,
    DateInputsModule,
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    DropDownsModule,
  ],
})
export class SharedModule {}