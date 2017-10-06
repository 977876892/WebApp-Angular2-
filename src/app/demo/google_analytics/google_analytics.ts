import {Component, OnInit, AfterViewInit} from '@angular/core';
import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {GoogleAnalyticsService} from './google_analytics_service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'google-analytics',
  templateUrl: './google_analytics.html',
  styleUrls: ['./google_analytics.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ],
  providers:[GoogleAnalyticsService]
})
export class GoogleAnalyticsComponent implements OnInit, AfterViewInit {

  discreteBarDemoData;
  lineChartDemoData;
  lineChartInterpolatedDemoData;
  serverLoadDemoData;
  activityFeedsDemoData;
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;
   private results: any={};
  constructor(private http:Http,private GoogleAnalyticsService :GoogleAnalyticsService) {


  }
private values:any={};
  ngOnInit() {





    this.discreteBarDemoData = discreteBarDemoDataGenerator();
    this.lineChartDemoData = lineChartDemoDataGenerator();
    this.lineChartInterpolatedDemoData = lineChartInterpolatedDemoDataGenerator();
    this.trafficSourcesDemoData = trafficSourcesDemoData;
  }
// getAnalytics()
// {

//     this.GoogleAnalyticsService.getAnalyticsValues(this.results[0].value)
//       .subscribe(res=>{
//             this.values=res;
//             console.log(this.values);
//        });
// }
items:string;
FilterByVisitsAnalytics(item){

   this.items=item;
    console.log(this.items);
   if(item == 'daily')
    {
         this.GoogleAnalyticsService.getDailyAnalytics()
        .subscribe(res => {
          this.results=res;
          console.log(this.results);
        });
    }

}

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}

