import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

// Import the funnel module
import 'highcharts/modules/funnel';

@Component({
  selector: 'app-funnel-chart',
  standalone: true,
  imports: [], // No specific Angular imports are needed for Highcharts itself
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.css'],
})
export class FunnelChartComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const customColors = [
      '#3F007D',
      '#54278F',
      '#6A51A3',
      '#807DBA',
      '#9E9AC8',
      '#BCBDDC',
      '#DADAEB',
    ];

    Highcharts.chart('funnelContainer', {
      chart: {
        type: 'funnel',
        marginRight: 0,
        inverted: true,
      },
      title: {
        text: '',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.y}',
            color: 'white',
            inside: true,
            rotation: 0,
            borderWidth: 0,
            style: {
              textOutline: 'none',
            },
          },
          width: '90%',
          neckWidth: '10%',
          neckHeight: '0%',
        },
      },
      legend: {
        enabled: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Hide tooltip to match the image's simplicity
      },
      credits: {
        enabled: false, // Hide Highcharts credits
      },
      series: [
        {
          name: 'Users',
          type: 'funnel',
          data: [
            { name: 'Step 1', y: 100, color: customColors[0] },
            { name: 'Step 2', y: 90, color: customColors[1] },
            { name: 'Step 3', y: 50, color: customColors[2] },
            { name: 'Step 4', y: 35, color: customColors[3] },
            { name: 'Step 5', y: 20, color: customColors[4] },
            { name: 'Step 6', y: 10, color: customColors[5] },
            { name: 'Step 7', y: 5, color: customColors[6] },
          ],
        },
      ],
    } as Highcharts.Options);
  }
}
