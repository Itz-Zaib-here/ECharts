import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EchartDemoComponent } from './echart-demo/echart-demo.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    },
    {
        path: 'echart-demo',
        component:EchartDemoComponent
    }
];
