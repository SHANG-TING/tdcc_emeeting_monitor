import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import { ajax } from 'rxjs/ajax';

import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tem-local-distribution-chart',
  templateUrl: './local-distribution-chart.component.html',
  providers: [ResizeObserverService],
})
export class LocalDistributionChartComponent implements AfterViewInit {
  private chart?: Highcharts.MapChart;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(@Inject(ResizeObserverService) entries$: ResizeObserverService) {
    entries$.pipe(untilDestroyed(this)).subscribe(() => {
      this.chart?.setSize();
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    ajax
      .getJSON<unknown>('https://code.highcharts.com/mapdata/countries/tw/tw-all.topo.json')
      .subscribe((topology) => {
        const data = [
          ['tw-pt', 10],
          ['tw-tn', 11],
          ['tw-il', 12],
          ['tw-ch', 13],
          ['tw-tt', 14],
          ['tw-ph', 15],
          ['tw-km', 16],
          ['tw-lk', 17],
          ['tw-tw', 18],
          ['tw-cs', 19],
          ['tw-th', 20],
          ['tw-yl', 21],
          ['tw-kh', 22],
          ['tw-tp', 23],
          ['tw-hs', 24],
          ['tw-hh', 25],
          ['tw-cl', 26],
          ['tw-ml', 27],
          ['tw-ty', 28],
          ['tw-cg', 29],
          ['tw-hl', 30],
          ['tw-nt', 31],
        ];

        // Create the chart
        this.chart = Highcharts.mapChart(this.container.nativeElement, <Highcharts.Options>{
          chart: {
            map: topology,
          },

          title: {
            text: '地區分布',
            align: 'left',
            style: { fontSize: '2rem', fontWeight: 'bold' },
          },

          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom',
            },
          },

          colorAxis: {
            min: 0,
          },

          series: [
            {
              data: data,
              name: 'Random data',
              states: {
                hover: {
                  color: '#BADA55',
                },
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}',
              },
            },
          ],
        });
      });
  }
}
