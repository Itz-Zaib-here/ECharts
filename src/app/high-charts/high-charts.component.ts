import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-high-charts',
  templateUrl: './high-charts.component.html',
  styleUrls: ['./high-charts.component.css'],
})
export class HighChartsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'pie',
        renderTo: 'container',
        // Cast to 'any' to allow 'custom' key
        ...({
          custom: {}, // 👈 bypass strict type checking here
        } as any),
        events: {
          render() {
            const chart = this as Highcharts.Chart;
            const series = chart.series[0];

            // Safely access custom label via type override
            const chartAny = chart as any;

            const label = chartAny.options.chart.custom.label;
            const x = series.center[0] + chart.plotLeft;
            const y =
              series.center[1] + chart.plotTop - label.attr('height') / 2;

            label.attr({ x, y });
            label.css({
              fontSize: `${series.center[2] / 12}px`,
            });
          },
        },
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      title: {
        text: '2023 Norway car registrations',
      },
      subtitle: {
        text: 'Source: Statistics Norway',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>',
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderRadius: 0,
          dataLabels: {
            enabled: false,
            format: '{point.name}: {point.percentage:.0f}%',
            style: {
              fontSize: '0.9em',
            },
            distance: 20,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Registrations',
          innerSize: '45%',
          data: [
            { name: 'EV', y: 23.9 },
            { name: 'Hybrids', y: 12.6 },
            { name: 'Diesel', y: 37.0 },
            { name: 'Petrol', y: 26.4 },
          ],
        },
      ],
    };

    Highcharts.chart(chartOptions as any);
  }
}
