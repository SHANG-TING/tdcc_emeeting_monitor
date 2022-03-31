import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Highcharts from 'highcharts';
import map from 'highcharts/modules/map';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

map(Highcharts);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
