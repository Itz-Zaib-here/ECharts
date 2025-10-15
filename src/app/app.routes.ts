import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EchartDemoComponent } from './echart-demo/echart-demo.component';
import { HighChartsComponent } from './high-charts/high-charts.component';
import { DatabasePreviewComponent } from './database-preview/database-preview';

export const routes: Routes = [
    {
        path: '',
        component:EchartDemoComponent
    },
    {
        path: 'Home',
        component:HomeComponent
    },
    {
        path: 'highCharts',
        component:HighChartsComponent
    },
  { path: "db-preview", component: DatabasePreviewComponent },

];
