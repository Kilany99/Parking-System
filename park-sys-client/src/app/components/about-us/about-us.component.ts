import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CardModule } from '@progress/kendo-angular-layout';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-about-us',
  imports: [
     CommonModule,
     ButtonsModule,
     LayoutModule,
     IndicatorsModule,
     RouterModule,
     IconsModule,
     CardModule

          ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  standalone :true,
})
export class AboutUsComponent {

}
