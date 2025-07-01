import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular directives if needed
import * as Highcharts from 'highcharts';
// Import Highcharts modules using standard ES module import syntax
import HighchartsMap from 'highcharts/modules/map';
import HighchartsFlowmap from 'highcharts/modules/flowmap'; // Import the Flowmap module
import { Options, Chart } from 'highcharts'; // Import Highcharts types for better type checking

/**
 * Helper function to apply Highcharts modules.
 * This function checks if the imported module is directly callable (a function)
 * or if its callable part is nested under a 'default' property.
 * This helps to handle various ways modules might be exported and imported
 * depending on TypeScript/JavaScript module interop settings.
 * @param module The imported Highcharts module.
 * @param highcharts The Highcharts core object.
 */
const applyHighchartsModule = (module: any, highcharts: any) => {
  if (typeof module === 'function') {
    module(highcharts);
  } else if (module && typeof module.default === 'function') {
    module.default(highcharts);
  } else {
    console.warn(
      'Highcharts module could not be applied:',
      module,
      'Please check module import and Highcharts version compatibility.'
    );
  }
};

// Initialize Highcharts modules using the helper function.
// This attempts to apply the modules correctly based on their export structure.
applyHighchartsModule(HighchartsMap, Highcharts);
applyHighchartsModule(HighchartsFlowmap, Highcharts); // Apply the Flowmap module

@Component({
  selector: 'app-migration-flow-chart',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Include CommonModule
  templateUrl: './migration-flow-chart.component.html',
  styleUrl: './migration-flow-chart.component.css',
})
export class MigrationFlowChartComponent implements AfterViewInit, OnDestroy {
  private chart: Chart | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.createMigrationFlowChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private async createMigrationFlowChart(): Promise<void> {
    try {
      const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world-continents.topo.json'
      ).then((response) => response.json());

      const chartOptions: Options = {
        chart: {
          map: topology,
          margin: 1,
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        credits: {
          enabled: false, // Hide Highcharts credits
        },
        mapView: {
          projection: {
            rotation: [-150],
            name: 'Miller',
          },
          fitToGeometry: {
            type: 'MultiPoint',
            coordinates: [
              // Left
              [-20, 20],
              // right
              [-35, 20],
            ],
          },
        },
        legend: {
          enabled: true,
        },
        accessibility: {
          point: {
            valueDescriptionFormat: '{xDescription}.',
          },
        },
        plotOptions: {
          series: {
            states: {
              inactive: {
                enabled: false,
              },
            },
          },
          mappoint: {
            tooltip: {
              headerFormat: '',
              pointFormat: '{point.name}<br/>years ago',
            },
          },
          // Cast 'flowmap' to 'any' to bypass TypeScript's strict type checking if needed
          flowmap: {
            tooltip: {
              pointFormat:
                '{point.options.from} \u2192 ' + '{point.options.to}',
            },
          },
        },
        series: [
          {
            type: 'map', // Explicitly define the type as 'map'
            name: 'World',
            borderWidth: 0,
            nullColor: '#baa',
            opacity: 0.7,
          },
          {
            name: 'Points in time',
            type: 'mappoint' as any, // Cast 'mappoint' to 'any'
            dataLabels: {
              format: '{point.id}',
              y: -7,
              color: 'contrast',
            },
            marker: {
              symbol: 'mapmarker',
            },
            data: [
              {
                id: '200  ',
                name: '200 000',
                lon: 26,
                lat: 4,
                dataLabels: {
                  y: 0,
                },
                marker: {
                  symbol: 'circle',
                },
              },
              {
                id: '70-50  ',
                name: '70 000 - 50 000',
                lon: 46,
                lat: 24,
              },
              {
                id: '45-35  ',
                name: '45 000 - 35 000',
                lon: 11,
                lat: 45,
              },
              {
                id: '50  ',
                name: '50 000',
                lon: 135,
                lat: -25,
              },
              {
                id: '45-35  ',
                name: '45 000 - 35 000',
                lon: 110,
                lat: 32,
              },
              {
                id: '20-15  ',
                name: '20 000 - 15 000',
                lon: -165,
                lat: 62,
              },
              {
                id: '15-12 ',
                name: '15 000 - 12 000',
                lon: -65,
                lat: -20,
              },
            ],
            zIndex: 2,
          },
          {
            name: 'Migrations',
            visible: false,
            color: 'rgb(205, 91, 147)',
            type: 'flowmap' as any, // Cast 'flowmap' to 'any'
            accessibility: {
              point: {
                valueDescriptionFormat:
                  'Origin: {point.options.from:.2f}, Destination: ' +
                  '{point.options.to:.2f}.',
              },
              description: 'This is a map showing where early humans migrated.',
            },
            lineWidth: 5,
            // lineWidth: 15,
            // growTowards: false,
            // fillOpacity: 1,
            opacity: 0.8,
            // weight: 1,
            // markerEnd: {
            //   width: '50%',
            //   height: '50%'
            // },
            data: [
              {
                from: [20, 0],
                to: [46, 24],
                curveFactor: 0,
                color: {
                  linearGradient: { x1: 0, y1: 1, x2: 1, y2: 0 },
                  stops: [
                    [0.25, 'rgba(205, 91, 147, 0)'],
                    [0.5, 'rgb(205, 91, 147)'],
                  ],
                },
              },
              {
                from: [46, 24],
                to: [-3, 40],
                curveFactor: -1.2,
                color: {
                  linearGradient: { x1: 1, y1: 1, x2: 0, y2: 0 },
                  stops: [
                    [0.25, 'rgba(205, 91, 147, 0)'],
                    [0.5, 'rgb(205, 91, 147)'],
                  ],
                },
              },
              {
                from: [46, 24],
                to: [135, -25],
                curveFactor: 0.6,
                color: {
                  linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                  stops: [
                    [0.1, 'rgba(205, 91, 147, 0)'],
                    [0.2, 'rgb(205, 91, 147)'],
                  ],
                },
              },
              {
                from: [102, 24],
                to: [156, 66],
                curveFactor: 0.2,
                color: {
                  linearGradient: { x1: 0, y1: 1, x2: 1, y2: 0 },
                  stops: [
                    [0.05, 'rgba(205, 91, 147, 0)'],
                    [0.2, 'rgb(205, 91, 147)'],
                  ],
                },
              },
              {
                from: [165, 66],
                to: [-65, -20],
                curveFactor: 0.6,
                color: {
                  linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0.5 },
                  stops: [
                    [0.05, 'rgba(205, 91, 147, 0)'],
                    [0.2, 'rgb(205, 91, 147)'],
                  ],
                },
              },
            ],
            zIndex: 1,
          },
          {
            name: 'Descriptions',
            type: 'mappoint' as any, // Cast 'mappoint' to 'any'
            marker: {
              enabled: false,
            },
            enableMouseTracking: false,
            dataLabels: {
              allowOverlap: true,
              color: 'contrast',
              style: {
                textOutline: 'none',
                fontStyle: 'italic',
                opacity: 0.4,
              },
            },
            keys: ['lon', 'lat', 'name'],
            data: [
              [0, 15, 'Africa'],
              [72, 50, 'Eurasia'],
              [-150, 0, 'Pacific<br/>Ocean'],
              [-90, 40, 'North<br/>America'],
            ],
          },
        ],
      };

      this.chart = Highcharts.mapChart('container', chartOptions);
    } catch (error) {
      console.error('Error loading map data or creating chart:', error);
    }
  }
}
