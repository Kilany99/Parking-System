import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login-component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [SharedModule, 
    CommonModule, 
    ReactiveFormsModule,
     AuthRoutingModule,
    HttpClientModule
  ],
})
export class AuthModule {}