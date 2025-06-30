import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartEvent
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);


@Component({
  selector: 'app-chart-js-file',
  templateUrl: './chart-js-file.component.html',
  styleUrls: ['./chart-js-file.component.css']
})
export class ChartJsFileComponent implements OnInit {
  @ViewChild('activityChart', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;
  isDrilldown = false;

  activityData = {
    summary: {
      budgetedLESHours: 55,
      actualUtilizedHours: 55,
      usageUtilized: 55,
      inProgressActivities: 60,
      completedActivities: 75
    },
    activityData: [
      {
        country: 'Pakistan',
        inProgress: 20,
        completed: 35,
        sites: [
          { site: 'Lahore', inProgress: 5, completed: 10 },
          { site: 'Karachi', inProgress: 10, completed: 15 },
          { site: 'Islamabad', inProgress: 5, completed: 10 }
        ]
      },
      {
        country: 'India',
        inProgress: 15,
        completed: 25,
        sites: [
          { site: 'Mumbai', inProgress: 5, completed: 10 },
          { site: 'Delhi', inProgress: 5, completed: 8 },
          { site: 'Bangalore', inProgress: 5, completed: 7 }
        ]
      },
      {
        country: 'Bangladesh',
        inProgress: 25,
        completed: 15,
        sites: [
          { site: 'Dhaka', inProgress: 15, completed: 10 },
          { site: 'Chittagong', inProgress: 10, completed: 5 }
        ]
      }
    ]
  };

  ngOnInit(): void {
    this.createChart();
  }

  getCountryChartData(): ChartData<'bar', number[], string> {
    const labels = this.activityData.activityData.map(a => a.country);
    const inProgress = this.activityData.activityData.map(a => a.inProgress);
    const completed = this.activityData.activityData.map(a => a.completed);

    return {
      labels,
      datasets: [
        {
          label: 'In Progress',
          data: inProgress,
          backgroundColor: '#1e3a8a'
        },
        {
          label: 'Completed',
          data: completed,
          backgroundColor: '#60a5fa'
        }
      ]
    };
  }

  getSiteChartData(countryIndex: number): ChartData<'bar', number[], string> {
    const country = this.activityData.activityData[countryIndex];
    const labels = country.sites.map(s => s.site);
    const inProgress = country.sites.map(s => s.inProgress);
    const completed = country.sites.map(s => s.completed);

    return {
      labels,
      datasets: [
        {
          label: 'In Progress',
          data: inProgress,
          backgroundColor: '#1e3a8a'
        },
        {
          label: 'Completed',
          data: completed,
          backgroundColor: '#60a5fa'
        }
      ]
    };
  }

  createChart(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.getCountryChartData(),
      options: {
        responsive: true,
        onClick: (event: ChartEvent, elements: any[]) => {
          if (!elements.length) return;
          const index = elements[0].index;

          if (!this.isDrilldown) {
            this.chart.data = this.getSiteChartData(index);
            this.chart.options!.plugins!.title!.text =
              'Activity by Site - ' + this.activityData.activityData[index].country;
            this.chart.update();
            this.isDrilldown = true;
          } else {
            this.chart.data = this.getCountryChartData();
            this.chart.options!.plugins!.title!.text = 'Activity by Country';
            this.chart.update();
            this.isDrilldown = false;
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Activity by Country'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: true
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: true
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            beginAtZero: true,
            stacked: true
          }
        }
      }
    });
  }
}
