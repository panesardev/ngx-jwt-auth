import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';
import { provideAuthInitializer } from './auth/auth.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ), 
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor]),
    ),
    provideAuthInitializer(),
  ],
};
