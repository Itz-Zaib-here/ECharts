import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-echart-demo',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `
    <div class="chart-container">
      <echarts [options]="chartOption" class="chart"></echarts>
    </div>
  `,
  styles: [
    `
      .chart-container {
        width: 100%;
        height: 400px;
      }
      .chart {
        width: 500px;
        height: 500px;
      }
    `,
  ],
})
export class EchartDemoComponent {
  chartOption: EChartsOption = {
    title:{
      text:'Line Chart',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [352, 350, 240, 300, 150, 100, 260],
        type: 'line',
      },
      {
        data:[122,342,232,123,121,143,134],
        type:'line',
      },
      {
        data:[102,242,132,23,21,43,34],
        type:'line',        
      }
    ],
  };


// chartOption:EChartsOption = {
//   title: [
//     {
//       text: 'Tangential Polar Bar Label Position (middle)'
//     }
//   ],
//   polar: {
//     radius: [30, '80%']
//   },
//   angleAxis: {
//     max: 4,
//     startAngle: 75
//   },
//   radiusAxis: {
//     type: 'category',
//     data: ['a', 'b', 'c', 'd']
//   },
//   tooltip: {},
//   series: {
//     type: 'bar',
//     data: [2, 1.2, 2.4, 3.6],
//     coordinateSystem: 'polar',
//     label: {
//       show: true,
//       position: 'middle', // or 'start', 'insideStart', 'end', 'insideEnd'
//       formatter: '{b}: {c}'
//     }
//   }
// };

}
