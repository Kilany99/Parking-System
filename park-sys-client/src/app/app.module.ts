import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/auth/components/login/login-component';
import { NavigationComponent } from './modules/shared/navigation/navigation.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {DialogsModule} from '@progress/kendo-angular-dialog';
@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    BrowserModule,
    NavigationComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule,
    DialogsModule,
    GridModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    ReactiveFormsModule
  ],
 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [],
})
export class AppModule {}