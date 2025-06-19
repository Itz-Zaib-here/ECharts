import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EchartDemoComponent } from './echart-demo/echart-demo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EchartDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECharts';
}
