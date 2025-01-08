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
import { enableProdMode } from '@angular/core';
import { Environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptorService } from './app/interceptors/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
if (Environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {providers: [
  provideRouter(routes),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  provideHttpClient(withFetch()),
  provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
          provideAnimations(),

],}).catch((err) => console.error(err));




  platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));  
