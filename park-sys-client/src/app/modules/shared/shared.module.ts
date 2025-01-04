import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import other shared modules
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// ... other shared imports

@NgModule({
  declarations: [
    // Shared components, directives, and pipes
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
    DropDownsModule,
  ],
})
export class SharedModule {}