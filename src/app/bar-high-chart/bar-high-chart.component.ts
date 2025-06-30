import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-high-chart',
  templateUrl: './bar-high-chart.component.html',
  styleUrls: ['./bar-high-chart.component.css'],
})
export class BarHighChartComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        renderTo: 'barContainer',
      },
      title:{
        text:""
      },
      xAxis: {
        categories: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United'],
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        headerFormat: '<b>{point.category}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          type: 'column',
          name: 'CL',
          color: '#003f5c', // dark blue
          data: [0, 2, 6, 3],
        },
        {
          type: 'column',
          name: 'FA Cup',
          color: '#2f4b7c', // medium blue
          data: [14, 8, 8, 12],
        },
        {
          type: 'column',
          name: 'BPL',
          color: '#6699cc', // lighter blue
          data: [3, 5, 1, 13],
        },
      ],
    };

    Highcharts.chart(chartOptions as any);
  }

  // private colorize(data: number[]): Highcharts.PointOptionsObject[] {
  //   return data.map((value) => ({
  //     y: value,
  //     color: value > 10 ? '#dc3545' : '#28a745',
  //   }));
  // }
}
