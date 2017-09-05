import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router} from "@angular/router";
import {VisitService} from "./visit.service";
import * as _ from 'underscore';


@Component({
  selector: 'ms-visitdash',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
   providers: [VisitService] ,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class VisitComponent implements OnInit, AfterViewInit {

  discreteBarDemoData;
  lineChartDemoData;
  lineChartInterpolatedDemoData;
  serverLoadDemoData;
  allVisits: any[];
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;
  public nextDate;


  constructor(private visitService: VisitService,private router: Router) {
       this.allVisits=[];
   }
  openAddNewVisit()
  {
    this.router.navigate(['/visit-details']);
  }
   fetchAppointments(passDate){
     console.log(passDate);
      this.visitService.getVisits(passDate).subscribe(data => {
        this.nextDate=data.nextdate;
        this.allVisits = this.allVisits.concat((_.chain(data.data).groupBy('startdate').pairs().value()));
       console.log(this.allVisits) ;
    });
   }
   loadMore(){
     this.fetchAppointments(this.nextDate);
   }


  ngOnInit() {
// if(Cookie.get("username")==null){
//     this.router.navigate(['/']);
// }
     var today=new Date();
     var passDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
     this.fetchAppointments(passDate);

    this.serverLoadDemoData = serverLoadDemoData;

    this.pieChartDemoData = pieChartDemoData;

    this.recentSalesDemoData = recentSalesDemoDataGenerator();
    this.recentSalesProductsDemoData = [
      {
        image: 'assets/img/avatars/1.png',
        itemName: 'Design Lamp',
        value: 39.54,
        timeAgo: '2 minutes ago'
      },
      {
        image: 'assets/img/avatars/2.png',
        itemName: 'Apple MacBook',
        value: 699,
        timeAgo: '19 minutes ago'
      },
      {
        image: 'assets/img/avatars/3.png',
        itemName: 'Apple iPhone 8',
        value: 3113.12,
        timeAgo: '2 hours ago'
      },
      {
        image: 'assets/img/avatars/4.png',
        itemName: 'USB-C Cable',
        value: 87.58,
        timeAgo: '6 hours ago'
      },
      {
        image: 'assets/img/avatars/5.png',
        itemName: 'Lighting Cable',
        value: 24.99,
        timeAgo: '13 hours ago'
      }
    ];

    this.trafficSourcesDemoData = trafficSourcesDemoData;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}



