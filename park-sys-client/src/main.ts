/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';  
import { CarComponent } from './app/components/car/car.component';

bootstrapApplication(AppComponent, {providers: [
  provideAnimations(),
  provideHttpClient(withFetch()),
  provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
]});
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  
  platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));  
