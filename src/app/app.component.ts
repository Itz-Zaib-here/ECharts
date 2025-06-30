import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EchartDemoComponent } from './echart-demo/echart-demo.component';
import { HeaderComponent } from './header/header.component';
import { ChartJsFileComponent } from './chart-js-file/chart-js-file.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECharts';
}
