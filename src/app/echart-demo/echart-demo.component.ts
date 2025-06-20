import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-echart-demo',
  standalone: true,
  imports: [HttpClientModule, NgxEchartsModule, CommonModule],
  templateUrl: './echart-demo.component.html',
  styleUrls: ['./echart-demo.component.css'],
})
export class EchartDemoComponent implements OnInit {
  dataVisible = false;
  chartOption: EChartsOption = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getData(): void {
    this.dataVisible = true;
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
            data: labels,
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
              data: values,
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
      });
  }

  closeData(): void {
    this.dataVisible = false;
    this.chartOption = {};
  }
}
