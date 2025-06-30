// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHighcharts } from 'highcharts-angular';

bootstrapApplication(AppComponent, {
  // keep your existing config…
  ...appConfig,
  // but _prepend_ the NgxEchartsModule.forRoot providers here:
  providers: [
    provideHighcharts(),
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ),
    // then spread the rest of your existing providers
    ...(appConfig.providers ?? [])
  ]
})
.catch((err) => console.error(err));
