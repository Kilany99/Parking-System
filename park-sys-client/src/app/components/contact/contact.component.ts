import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent, TextBoxComponent } from '@progress/kendo-angular-inputs';
import { LabelComponent } from '@progress/kendo-angular-label';
import { ButtonComponent } from '@progress/kendo-angular-buttons';
import { IconComponent } from '@progress/kendo-angular-icons';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    IconComponent,
    TextAreaComponent,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public onSubmit(): void {
    console.log('Form submitted');}
}