import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular directives if needed
import * as Highcharts from 'highcharts';
// Import Highcharts modules directly. The way they are exported might vary.
import HighchartsMap from 'highcharts/modules/map';
import HighchartsExporting from 'highcharts/modules/exporting';
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
    // If the module itself is a function, call it directly.
    module(highcharts);
  } else if (module && typeof module.default === 'function') {
    // If the module is an object and has a 'default' property that is a function, call it.
    module.default(highcharts);
  } else {
    // Log a warning if the module could not be applied, which might indicate a deeper issue.
    console.warn('Highcharts module could not be applied:', module, 'Please check module import and Highcharts version compatibility.');
  }
};

// Initialize Highcharts modules using the helper function.
// This attempts to apply the modules correctly based on their export structure.
applyHighchartsModule(HighchartsMap, Highcharts);
applyHighchartsModule(HighchartsExporting, Highcharts);

@Component({
  selector: 'app-map-chart',
  standalone: true, // Mark as standalone to be used directly in other components
  imports: [CommonModule], // Include CommonModule for common Angular directives
  templateUrl: './map-chart.component.html',
  styleUrl: './map-chart.component.css'
})
export class MapChartComponent implements AfterViewInit, OnDestroy {
  // Declare a property to hold the Highcharts chart instance.
  // Using Highcharts.Chart type for strong typing.
  private chart: Chart | undefined;

  constructor() { }

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * This is the appropriate place to initialize the Highcharts chart, as the 'container'
   * element will be available in the DOM.
   */
  ngAfterViewInit(): void {
    this.createMapChart();
  }

  /**
   * Angular lifecycle hook called when the component is about to be destroyed.
   * It's crucial to destroy the Highcharts chart instance here to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy the chart instance
    }
  }

  /**
   * Asynchronously fetches map topology data and then creates the Highcharts map chart.
   */
  private async createMapChart(): Promise<void> {
    try {
      // Fetch the GeoJSON topology data for Europe from Highcharts CDN.
      const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/europe.topo.json'
      ).then(response => response.json());

      // Define the data for the map points. Each array element represents a city:
      // [country_code, latitude, longitude, city_name, temperature_celsius]
      const data = [
        ['is', 64.15, -21.95, 'Reykjavik', -6],
        ['fo', 62, -6.79, 'Torshavn', 1],
        ['fi', 60.16, 24.93, 'Helsinki', -6],
        ['no', 59.91, 10.75, 'Oslo', -8],
        ['ee', 59.43, 24.71, 'Tallinn', -4],
        ['se', 59.33, 18.05, 'Stockholm', -4],
        ['lv', 56.95, 24.1, 'Riga', -2],
        ['ru', 55.75, 37.6, 'Moscow', -5],
        ['dk', 55.66, 12.58, 'Copenhagen', 0],
        ['lt', 54.68, 25.31, 'Vilnius', -3],
        ['by', 53.9, 27.56, 'Minsk', -3],
        ['ie', 53.31, -6.23, 'Dublin', 3],
        ['de', 52.51, 13.4, 'Berlin', -5],
        ['nl', 52.35, 4.91, 'Amsterdam', -4],
        ['pl', 52.25, 21, 'Warsaw', -10],
        ['gb', 51.5, -0.08, 'London', -1],
        ['be', 50.83, 4.33, 'Brussels', -2],
        ['ua', 50.43, 30.51, 'Kyiv', -3],
        ['cz', 50.08, 14.46, 'Prague', -3],
        ['lu', 49.6, 6.11, 'Luxembourg', -2],
        ['fr', 48.86, 2.33, 'Paris', -1],
        ['at', 48.2, 16.36, 'Vienna', 0],
        ['sk', 48.15, 17.11, 'Bratislava', -1],
        ['hu', 47.5, 19.08, 'Budapest', -1],
        ['li', 47.13, 9.51, 'Vaduz', 4],
        ['md', 47, 28.85, 'Chisinau', 0],
        ['ch', 46.91, 7.46, 'Bern', 2],
        ['si', 46.05, 14.51, 'Ljubljana', 0],
        ['hr', 45.8, 16, 'Zagreb', 0],
        ['rs', 44.83, 20.5, 'Belgrade', 2],
        ['ro', 44.43, 26.1, 'Bucharest', 1],
        ['sm', 43.93, 12.41, 'San Marino', 3],
        ['ba', 43.86, 18.41, 'Sarajevo', 7],
        ['mc', 43.73, 7.41, 'Monaco', 8],
        ['bg', 42.68, 23.31, 'Sofia', 1],
        ['me', 42.43, 19.26, 'Podgorica', 9],
        ['ad', 42.2, 1.24, 'Andorra la Vella', 7],
        ['mk', 42, 21.43, 'Skopje', 4],
        ['it', 41.9, 12.48, 'Rome', 12],
        ['va', 41.9, 12.45, 'Vatican', 12],
        ['al', 41.31, 19.81, 'Tirana', 11],
        ['es', 40.4, -3.68, 'Madrid', 11],
        ['tr', 39.93, 32.86, 'Ankara', 9],
        ['pt', 38.71, -9.13, 'Lisbon', 15],
        ['gr', 37.98, 23.73, 'Athens', 13],
        ['mt', 35.88, 14.5, 'Valetta', 19],
        ['nc', 35.18, 33.36, 'North Nicosia', 16],
        ['cy', 35.16, 33.36, 'Nicosia', 16]
      ];

      // Define the Highcharts chart options.
      // Explicitly typing it as Highcharts.Options provides better type checking.
      const chartOptions: Options = {
        chart: {
          map: topology, // Assign the fetched topology data to the map property
          margin: 1
        },
        title: {
          text: 'Winter day temperatures in Europe',
          align: 'right',
          floating: true,
          style: {
            textOutline: '5px contrast'
          }
        },
        subtitle: {
          text: 'Data source: <a href="https://api.met.no/">api.met.no</a>',
          align: 'right',
          floating: true,
          y: 36
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox',
            verticalAlign: 'bottom'
          }
        },
        mapView: {
          padding: [0, 0, 85, 0]
        },
        colorAxis: {
          min: -25,
          max: 40,
          labels: {
            format: '{value}°C'
          },
          stops: [
            [0, '#0000ff'], // Blue for very cold temperatures
            [0.3, '#6da5ff'], // Lighter blue
            [0.6, '#ffff00'], // Yellow for moderate temperatures
            [1, '#ff0000'] // Red for hot temperatures
          ]
        },
        legend: {
          title: {
            text: 'Degrees Celsius'
          },
          floating: true,
          backgroundColor: `color-mix(
            in srgb,
            var(--highcharts-background-color, white),
            transparent 15%
          )`
        },
        tooltip: {
          headerFormat: '<span style="color:{point.color}">\u25CF</span> ' +
            '{point.key}:<br/>',
          pointFormat: 'Temperature: <b>{point.y}°C</b>'
        },
        exporting: {
          buttons: {
            contextButton: {
              align: 'left'
            }
          }
        },
        series: [{
          type: 'map', // Explicitly define the type as 'map' for the country series
          allAreas: true, // Apply to all areas in the map
          name: 'Countries',
          states: {
            inactive: {
              opacity: 1 // Keep inactive states fully opaque
            }
          },
          dataLabels: {
            enabled: false // Disable data labels for countries
          },
          enableMouseTracking: false, // Disable mouse tracking for countries
          borderColor: 'var(--highcharts-neutral-color-20, #ccc)' // Border color for countries
        }, {
          name: 'Capitals of Europe',
          // Define the keys corresponding to the data array structure for map points
          keys: ['id', 'lat', 'lon', 'name', 'y'],
          data, // The data array containing city information
          animation: false, // Disable animation for map points
          // Cast 'mappoint' to 'any' to bypass TypeScript's strict type checking for this property.
          // This is a workaround if the 'declare module' augmentation isn't fully effective in your setup.
          type: 'mappoint' as any,
          showInLegend: false, // Do not show this series in the legend
          marker: {
            enabled: false // Disable default markers for map points
          },
          dataLabels: {
            crop: true, // Crop data labels if they extend beyond plot area
            format: '{y}', // Format data label to show temperature (y-value)
            inside: true, // Place data labels inside the marker shape
            y: -14, // Adjust vertical position of data labels
            style: {
              color: 'contrast', // Color for data labels
              textOutline: 'none' // No text outline
            },
            shape: 'mapmarker', // Use a map marker shape for data labels
            borderColor: 'black', // Border color for the map marker shape
            borderWidth: 1, // Border width for the map marker shape
            backgroundColor: 'auto' // Background color for the map marker shape
          },
          accessibility: {
            point: {
              // Accessibility description for screen readers
              valueDescriptionFormat: '{xDescription}, {point.temp}°C.'
            }
          }
        }]
      };

      // Create the Highcharts map chart, rendering it into the div with id 'container'.
      // The first argument is the ID of the HTML element, and the second is the chart options.
      this.chart = Highcharts.mapChart('container', chartOptions);
    } catch (error) {
      // Log any errors that occur during data fetching or chart creation.
      console.error('Error loading map data or creating chart:', error);
    }
  }
}
