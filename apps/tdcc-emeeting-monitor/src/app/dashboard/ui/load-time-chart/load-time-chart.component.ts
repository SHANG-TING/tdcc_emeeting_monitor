import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import { ajax } from 'rxjs/ajax';

import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { APP_BASE_HREF } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'tem-load-time-chart',
  templateUrl: './load-time-chart.component.html',
  providers: [ResizeObserverService],
})
export class LoadTimeChartComponent implements AfterViewInit {
  private chart?: Highcharts.Chart;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(ResizeObserverService) entries$: ResizeObserverService
  ) {
    entries$.pipe(untilDestroyed(this)).subscribe(() => {
      this.chart?.setSize();
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    ajax
      .getJSON(`${this.baseHref}/assets/highcharts/highcharts@v7.0.0/samples/data/usdeur.json`)
      .subscribe((data) => {
        this.chart = Highcharts.chart(this.container.nativeElement, <Highcharts.Options>{
          chart: {
            zoomType: 'x',
          },
          title: {
            text: '網頁載入時間',
            align: 'left',
            style: { fontSize: '2rem', fontWeight: 'bold' },
          },
          xAxis: {
            type: 'datetime',
          },
          yAxis: {
            title: {
              text: 'Exchange rate',
            },
          },
          legend: {
            enabled: false,
          },
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1,
                },
                stops: [
                  [0, Highcharts.getOptions().colors![0]],
                  [
                    1,
                    Highcharts.color(Highcharts.getOptions().colors![0]).setOpacity(0).get('rgba'),
                  ],
                ],
              },
              marker: {
                radius: 2,
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1,
                },
              },
              threshold: null,
            },
          },

          series: [
            {
              type: 'area',
              name: 'USD to EUR',
              data: data,
            },
          ],
        });
      });
  }
}
