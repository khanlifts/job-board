import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { GlobalErrorHandler } from './services/global-error.handler';
import { CustomPreloadingStrategy } from './strategies/preload.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy)
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
