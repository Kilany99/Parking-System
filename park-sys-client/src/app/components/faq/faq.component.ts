import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBarModule } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PanelBarModule,
  ],
})
export class FaqComponent {}