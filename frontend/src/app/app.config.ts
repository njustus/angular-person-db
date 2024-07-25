import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {Configuration, PersonApiModule} from '../../generated-src/person-api';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE' },
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      PersonApiModule.forRoot(() => new Configuration({basePath: "/api"})),
      BrowserModule
    )
  ]
};
