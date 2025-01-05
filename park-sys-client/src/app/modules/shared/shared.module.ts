import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import other shared modules
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { NavigationComponent } from './navigation/navigation.component';
@NgModule({
  declarations: [],
  imports: [CommonModule,NavigationComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    DropDownsModule,
  ],
})
export class SharedModule {}