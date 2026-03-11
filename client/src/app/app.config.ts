import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OidcSecurityService, provideAuth } from 'angular-auth-oidc-client';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './_interceptors/auth.interceptor';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimations(),
    provideToastr(),
    provideAuth({
      config: {
        authority: 'http://localhost:9000/application/o/lonelysouls',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'MiTVT9LO4R5bb3d80BuvpauOl9YuRyFvOigTUC7O',
        scope: 'openid profile email',
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false
      }
    }),
    provideAppInitializer(() => inject(OidcSecurityService).checkAuth())
  ]
};
