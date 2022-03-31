import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/feature/dashboard.component';
import { LoadTimeChartComponent } from './dashboard/ui/load-time-chart/load-time-chart.component';
import { LocalDistributionChartComponent } from './dashboard/ui/local-distribution-chart/local-distribution-chart.component';
import { SourceAnalysisChartComponent } from './dashboard/ui/source-analysis-chart/source-analysis-chart.component';
import { MeetingComponent } from './meeting/feature/meeting.component';
import { PageViewAnalysisChartComponent } from './meeting/ui/page-view-analysis-chart/page-view-analysis-chart.component';
import { QuestionAnalysisChartComponent } from './meeting/ui/question-analysis-chart/question-analysis-chart.component';
import { EventChartComponent } from './shared/ui/event-chart/event-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SourceAnalysisChartComponent,
    LocalDistributionChartComponent,
    LoadTimeChartComponent,
    MeetingComponent,
    QuestionAnalysisChartComponent,
    PageViewAnalysisChartComponent,
    EventChartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'meeting/:code', component: MeetingComponent },
    ]),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
