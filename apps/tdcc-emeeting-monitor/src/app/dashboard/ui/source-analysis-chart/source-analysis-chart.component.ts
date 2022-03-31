import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';

import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tem-source-analysis-chart',
  templateUrl: './source-analysis-chart.component.html',
  providers: [ResizeObserverService],
})
export class SourceAnalysisChartComponent implements AfterViewInit {
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

  private initChart() {
    this.chart = Highcharts.chart(this.container.nativeElement, <Highcharts.Options>{
      chart: {
        type: 'pie',
      },

      title: {
        text: '來源分析',
        align: 'left',
        style: { fontSize: '2rem', fontWeight: 'bold' },
      },

      accessibility: {
        announceNewData: {
          enabled: true,
        },
        point: {
          valueSuffix: '%',
        },
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: 'Browsers',
          colorByPoint: true,
          data: [
            {
              name: '集保e存摺',
              y: 3.2,
            },
            {
              name: 'StockVote',
              y: 3.2,
            },
            {
              name: '1030 土銀',
              y: 1.8,
            },
            {
              name: '1040 臺銀證券',
              y: 1.8,
            },
            {
              name: '1110 台灣企銀',
              y: 1.8,
            },
            {
              name: '1160 日盛',
              y: 1.8,
            },
            {
              name: '1230 彰銀',
              y: 1.8,
            },
            {
              name: '1260 宏遠',
              y: 1.8,
            },
            {
              name: '1360 港商麥格理',
              y: 1.8,
            },
            {
              name: '1380 台灣匯立',
              y: 1.8,
            },
            {
              name: '1440 美林',
              y: 1.8,
            },
            {
              name: '1470 台灣摩根士丹利',
              y: 1.8,
            },
            {
              name: '1480 美商高盛',
              y: 1.8,
            },
            {
              name: '1520 瑞士信貸',
              y: 1.8,
            },
            {
              name: '1560 港商野村',
              y: 1.8,
            },
            {
              name: '1570 港商法國興業',
              y: 1.8,
            },
            {
              name: '1590 花旗環球',
              y: 1.8,
            },
            {
              name: '1650 新加坡商瑞銀',
              y: 1.8,
            },
            {
              name: '2180 亞東',
              y: 1.8,
            },
            {
              name: '2200 元大期貨',
              y: 1.8,
            },
            {
              name: '2210 群益期貨',
              y: 1.8,
            },
            {
              name: '5050 大展',
              y: 1.8,
            },
            {
              name: '5110 富隆',
              y: 1.8,
            },
            {
              name: '5260 美好',
              y: 1.8,
            },
            {
              name: '5320 高橋',
              y: 1.8,
            },
            {
              name: '5380 第一金',
              y: 1.8,
            },
            {
              name: '5460 寶盛',
              y: 1.8,
            },
            {
              name: '5600 永興',
              y: 1.8,
            },
            {
              name: '5660 日進',
              y: 1.8,
            },
            {
              name: '5850 統一',
              y: 1.8,
            },
            {
              name: '5860 盈溢',
              y: 1.8,
            },
            {
              name: '5920 元富',
              y: 1.8,
            },
            {
              name: '5960 日茂',
              y: 1.8,
            },
            {
              name: '6010 犇亞證券',
              y: 1.8,
            },
            {
              name: '6110 台中銀',
              y: 1.8,
            },
            {
              name: '6160 中國信託',
              y: 1.8,
            },
            {
              name: '6210 新百王',
              y: 1.8,
            },
            {
              name: '6380 光和',
              y: 1.8,
            },
            {
              name: '6450 永全',
              y: 1.8,
            },
            {
              name: '6460 大昌',
              y: 1.8,
            },
            {
              name: '6480 福邦',
              y: 1.8,
            },
            {
              name: '6620 口袋',
              y: 1.8,
            },
            {
              name: '6910 德信',
              y: 1.8,
            },
            {
              name: '6950 福勝',
              y: 1.8,
            },
            {
              name: '7000 兆豐',
              y: 1.8,
            },
            {
              name: '7030 致和',
              y: 1.8,
            },
            {
              name: '7070 豐農',
              y: 1.8,
            },
            {
              name: '7080 石橋',
              y: 1.8,
            },
            {
              name: '7750 北城',
              y: 1.8,
            },
            {
              name: '7790 國票',
              y: 1.8,
            },
            {
              name: '8150 台新',
              y: 1.8,
            },
            {
              name: '8380 安泰',
              y: 1.8,
            },
            {
              name: '8440 摩根大通',
              y: 1.8,
            },
            {
              name: '8450 康和',
              y: 1.8,
            },
          ],
        },
      ],
    });
  }
}
