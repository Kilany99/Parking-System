import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login-component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule } from '@angular/common/http';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [SharedModule, 
    CommonModule, 
    ReactiveFormsModule,
    AuthRoutingModule,
    TextBoxModule,
    LabelModule,
    ButtonsModule,
    InputsModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthModule {}