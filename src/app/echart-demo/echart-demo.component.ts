import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { ChartJsFileComponent } from '../chart-js-file/chart-js-file.component';
import { HighChartsComponent } from '../high-charts/high-charts.component';
import { BarHighChartComponent } from '../bar-high-chart/bar-high-chart.component';
import { FunnelChartComponent } from '../funnel-chart/funnel-chart.component';

@Component({
  selector: 'app-echart-demo',
  standalone: true,
  imports: [HttpClientModule, NgxEchartsModule, CommonModule,ChartJsFileComponent,HighChartsComponent,BarHighChartComponent,FunnelChartComponent],
  templateUrl: './echart-demo.component.html',
  styleUrls: ['./echart-demo.component.css'],
})
export class EchartDemoComponent implements OnInit {
  dataVisible = false;
  chartOption: EChartsOption = {};
  pieChartOption: EChartsOption = {};
  barChart: EChartsOption = {};
  radialPolarBarLabelPosition: EChartsOption = {};
  clickZoom: EChartsOption = {};
  newChart: EChartsOption = {};
  sunburstChartOption: EChartsOption = {};
  data: number[] = [];
  zoomSize: number = 6;
  myChart!: ECharts;
  dataAxis: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http
      .get<any>('https://api.coingecko.com/api/v3/exchange_rates')
      .subscribe((res) => {
        if (!res || !res.rates) {
          console.error('Invalid response from API');
          return;
        }

        const rates = res.rates;
        const currencies = Object.keys(rates);
        const values = currencies.map((key) => rates[key].value);
        const labels = currencies.map((key) => rates[key].name);

        // Line Chart
        this.chartOption = {
          title: {
            text: 'Currency Exchange Rates',
            left: 'center',
            top: 10,
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333',
            },
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#ccc',
            textStyle: {
              color: '#fff',
            },
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: labels.slice(0, 10),
            axisLabel: {
              rotate: 45,
              color: '#666',
              fontSize: 12,
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#666',
            },
            splitLine: {
              lineStyle: {
                color: '#eee',
              },
            },
          },
          series: [
            {
              name: 'Rate',
              type: 'line',
              smooth: true,
              data: values.slice(0, 10),
              lineStyle: {
                width: 3,
                color: '#4f8aff',
              },
              itemStyle: {
                color: '#4f8aff',
              },
              areaStyle: {
                color: 'rgba(79,138,255,0.2)',
              },
            },
          ],
        };

        // Pie Chart
        this.pieChartOption = {
          title: {
            text: 'Top Currency Rates',
            left: 'center',
            top: 10,
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'horizontal',
            bottom: 0,
            left: 'center',
            type: 'scroll',
            textStyle: {
              fontSize: 12,
              color: '#333',
            },
            pageButtonItemGap: 5,
            pageIconSize: 22,
            pageTextStyle: {
              color: '#999',
            },
          },
          series: [
            {
              name: 'Rate',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '16',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: currencies.map((key) => ({
                name: rates[key].name,
                value: rates[key].value,
              })),
            },
          ],
        };

        // Bar Chart
        this.barChart = {
          title: {
            text: 'Currency Exchange Rates',
            left: 'center',
            top: 10,
          },
          xAxis: {
            type: 'category',
            data: labels.slice(0, 6),
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'bar',
              data: values.slice(0, 6),
            },
          ],
        };

        // Radial Polar Bar Chart
        this.radialPolarBarLabelPosition = {
          title: [
            {
              text: 'Radial Polar Bar Label Position (middle)',
            },
          ],
          polar: {
            radius: [30, '80%'],
          },
          radiusAxis: {
            max: 4,
          },
          angleAxis: {
            type: 'category',
            data: labels.slice(0, 6),
            startAngle: 75,
          },
          tooltip: {},
          series: {
            type: 'bar',
            data: values.slice(0, 6),
            coordinateSystem: 'polar',
            label: {
              show: true,
              position: 'middle',
              formatter: '{b}: {c}',
            },
          },
          animation: false,
        };

        // Click Zoom Chart
        const dataAxis = values
          .slice(0, 20)
          .map((_, i) => `${values[i]} ${i + 1}`);
        const data = labels
          .slice(0, 20)
          .map(() => Math.round(Math.random() * 500));

        this.dataAxis = dataAxis;
        this.data = data;

        this.clickZoom = {
          title: {
            text: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              color: '#fff',
            },
            axisTick: { show: false },
            axisLine: { show: false },
            z: 10,
          },
          yAxis: {
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#999' },
          },
          dataZoom: [{ type: 'inside' }],
          series: [
            {
              type: 'bar',
              showBackground: true,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' },
                ]),
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' },
                  ]),
                },
              },
              data: data,
            },
          ],
        };
      });

    //new chart
    interface GraphNode {
      symbolSize: number;
      label?: {
        show?: boolean;
      };
    }

    // Load Les Miserables graph data using Angular HttpClient
    this.myChart?.showLoading();
    this.http
      .get<any>(
        'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/les-miserables.json'
      )
      .subscribe((graph: any) => {
        this.myChart?.hideLoading();

        graph.nodes.forEach((node: GraphNode) => {
          node.label = {
            show: node.symbolSize > 30,
          };
        });
        this.newChart = {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right',
          },
          tooltip: {},
          legend: [
            {
              // selectedMode: 'single',
              data: graph.categories.map((a: { name: string }) => a.name),
            },
          ],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              legendHoverLink: false,
              layout: 'none',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}',
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3,
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: {
                  width: 10,
                },
              },
            },
          ],
        };

        // this.myChart?.setOption(this.newChart);
      });

    //sunburst chart
    var data = [
      {
        name: 'Grandpa',
        children: [
          {
            name: 'Uncle Leo',
            value: 15,
            children: [
              {
                name: 'Cousin Jack',
                value: 2,
              },
              {
                name: 'Cousin Mary',
                value: 5,
                children: [
                  {
                    name: 'Jackson',
                    value: 2,
                  },
                ],
              },
              {
                name: 'Cousin Ben',
                value: 4,
              },
            ],
          },
          {
            name: 'Father',
            value: 10,
            children: [
              {
                name: 'Me',
                value: 5,
              },
              {
                name: 'Brother Peter',
                value: 1,
              },
            ],
          },
        ],
      },
      {
        name: 'Nancy',
        children: [
          {
            name: 'Uncle Nike',
            children: [
              {
                name: 'Cousin Betty',
                value: 1,
              },
              {
                name: 'Cousin Jenny',
                value: 2,
              },
            ],
          },
        ],
      },
    ];

    this.sunburstChartOption = {
      series: {
        type: 'sunburst',
        data: data,
        radius: [60, '90%'],
        itemStyle: {
          borderRadius: 7,
          borderWidth: 2,
        },
        label: {
          show: false,
        },
      },
    };
  }

  onChartInit(chart: ECharts) {
    this.myChart = chart;

    this.myChart.on('click', (params: any) => {
      const start =
        this.dataAxis[Math.max(params.dataIndex - this.zoomSize / 2, 0)];
      const end =
        this.dataAxis[
          Math.min(params.dataIndex + this.zoomSize / 2, this.data.length - 1)
        ];

      this.myChart.dispatchAction({
        type: 'dataZoom',
        startValue: start,
        endValue: end,
      });
    });
  }
}
