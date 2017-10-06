import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router} from "@angular/router";
import {UserService} from "./query.service";
import{QueryConfirmationDialog} from "./confirmation-dialog"
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/material';




@Component({
  selector: 'ms-querydash',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
   providers: [UserService] ,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class QueryComponent implements OnInit, AfterViewInit {

  discreteBarDemoData;
  lineChartDemoData;
  lineChartInterpolatedDemoData;
  serverLoadDemoData;
  allQueries;
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;
  private router: Router;

  constructor(private userService: UserService,public dialog: MdDialog) {

   }

  ngOnInit() {

    this.userService.getQueries().subscribe(data => {this.allQueries = data.posts;console.log(data.posts)});


    this.serverLoadDemoData = serverLoadDemoData;

    this.pieChartDemoData = pieChartDemoData;

    this.recentSalesDemoData = recentSalesDemoDataGenerator();


    this.trafficSourcesDemoData = trafficSourcesDemoData;
  }

   exportToExcel(event) {
    this.userService.exportAsExcelFile(this.allQueries, 'queries');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }


  dialogRef: MdDialogRef<QueryConfirmationDialog>;

   deletequery(id){
     console.log(id);
     this.dialogRef = this.dialog.open(QueryConfirmationDialog, {
      disableClose: false

    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
          console.log(id);
          this.userService.QueryDelete(id)
          .subscribe(data=>{
            this.deletequery= data;
            console.log(this.deletequery);

          });

      }
      this.dialogRef = null;
    });
   }


}
