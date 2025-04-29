import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideAuth0 } from '@auth0/auth0-angular';

import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideAuth0({
      domain: 'dev-rf6kcs3z3otn50pc.us.auth0.com',
      clientId: 'i8jfDPDg8Q6VjCuHbYZdeY2pHScOVJAe',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
});
