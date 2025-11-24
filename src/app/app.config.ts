import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule), // ✅ Forma correcta para standalone
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), importProvidersFrom(HttpClientModule)
  ]
};