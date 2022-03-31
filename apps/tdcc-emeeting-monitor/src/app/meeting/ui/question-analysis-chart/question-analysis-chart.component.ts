import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';

import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tem-question-analysis-chart',
  templateUrl: './question-analysis-chart.component.html',
  providers: [ResizeObserverService],
})
export class QuestionAnalysisChartComponent implements AfterViewInit {
  private chart?: Highcharts.Chart;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(@Inject(ResizeObserverService) entries$: ResizeObserverService) {
    entries$.pipe(untilDestroyed(this)).subscribe(() => {
      this.chart?.setSize();
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    this.chart = Highcharts.chart(this.container.nativeElement, <Highcharts.Options>{
      chart: {
        type: 'bar',
      },
      title: {
        text: '提問分析',
        align: 'left',
        style: { fontSize: '2rem', fontWeight: 'bold' },
      },
      xAxis: {
        categories: ['議案一', '議案二', '議案三', '原議案修正', '臨時動議'],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '提問數量',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: ' millions',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF',
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: '待審查',
          data: [107, 31, 635, 203, 2],
        },
        {
          name: '已審查',
          data: [133, 156, 947, 408, 6],
        },
        {
          name: '已發布',
          data: [814, 841, 3714, 727, 31],
        },
        {
          name: '存查',
          data: [1216, 1001, 4436, 738, 40],
        },
      ],
    });
  }
}
