import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';

import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tem-page-view-analysis-chart',
  templateUrl: './page-view-analysis-chart.component.html',
  providers: [ResizeObserverService],
})
export class PageViewAnalysisChartComponent implements AfterViewInit {
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
    Highcharts.chart(this.container.nativeElement, <Highcharts.Options>{
      title: {
        text: 'Page View',
        align: 'left',
        style: { fontSize: '2rem', fontWeight: 'bold' },
      },

      yAxis: {
        title: {
          text: '數量',
        },
      },

      xAxis: {
        title: {
          text: '時間',
        },
        accessibility: {
          rangeDescription: '時間',
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          name: 'Client',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        },
        {
          name: 'Vote',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
        },
        {
          name: 'Other',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    });
  }
}
