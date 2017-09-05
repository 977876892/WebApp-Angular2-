import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router,ActivatedRoute,Params,ActivatedRouteSnapshot } from "@angular/router";
import {VisitService} from "./visit.service";
import {NewVisitForm} from "./visit";




@Component({
  selector: 'VisitDetailed',
  templateUrl: './visit.detail.component.html',
  styleUrls: ['./visit.component.scss'],
   providers: [VisitService] ,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class VisitDetails implements OnInit, AfterViewInit {

  discreteBarDemoData;
  lineChartDemoData;
  lineChartInterpolatedDemoData;
  serverLoadDemoData;
  detailQuery;
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;
  private router: Router;
  private addComment:string;
  //private route: ActivatedRoute;
  private id :String;
  private newVisit=new NewVisitForm();

  //form details
  //private selectedValue:number;
  // private selectedDoctor:number;
  // private firstname:String;
  // private lastname:String;
  // private phone:String;
  // private totalamount:String;
  // private depositamount:String;
  // private email:String;
  // private age:String;
  // private dob:String;
  // private status:String;
  // private gender:String;
  // private city:String;
  // private area:String;
  // private remarks:String;
   private drTimeSlots:String;
   private newAppStatus:any;
  // private selectedDate:String;
  // private startTime:String;
  // private endTime:String;
  //form details

  drlist:any[];
  onChange(selectedDoctor){
    console.log(selectedDoctor);
    this.newVisit.selectedDoctor=selectedDoctor;
    //this.selectedDoctor=selectedDoctor;
  }
  onTimeChange(selectedTime){
      this.newVisit.startTime=selectedTime.timeslot_starttime;
      this.newVisit.endTime=selectedTime.timeslot_endtime;
  }
    dateChange(datechange){

    this.visitService.getDrTimeslots(this.newVisit.selectedDoctor,datechange).subscribe(data => {this.drTimeSlots = data.data;console.log(data)});

    }
  constructor(private visitService: VisitService,private route: ActivatedRoute) {
   }
  addNewVisit(newVisit){
    this.newVisit=newVisit;
    console.log(this.newVisit);
    // console.log(this.selectedDoctor);
    // console.log( this.selectedDate);
    // console.log(this.startTime);
    // console.log(this.endTime);
    // console.log(this.firstname);
    // console.log(this.lastname);
    // console.log(this.phone);
    // console.log(this.totalamount);
    // console.log(this.depositamount);
    // console.log(this.email);
    // console.log(this.age);
    // console.log(this.dob);
    // console.log(this.status);
    // console.log(this.gender);
    // console.log(this.city);
    // console.log(this.area);
    // console.log(this.remarks);

    this.visitService.saveAppointment(this.newVisit)
    .subscribe(data => {this.newAppStatus = data;console.log(this.newAppStatus)});
  }
  ngOnInit() {
if(Cookie.get("username")==null){
    this.router.navigate(['/']);
}
       this.visitService.getDrList().subscribe(data => {this.drlist = data.data;console.log(this.drlist)});
     // this.visitService.getVisits().subscribe(data => {this.drlist = data.data;console.log(data)});
    // this.route.params.subscribe(params => {
    //    this.id = params['id'];
    // });

    // this.visitService.getDetailQuery(this.id).subscribe(data => {this.detailQuery = data.posts;

    // });

    //this.discreteBarDemoData = discreteBarDemoDataGenerator();
    //this.lineChartDemoData = lineChartDemoDataGenerator();
    //this.lineChartInterpolatedDemoData = lineChartInterpolatedDemoDataGenerator();

    // this.activityFeedsDemoData = [
    //   {
    //     image: 'assets/img/avatars/10.png',
    //     name: 'Sophie',
    //     subject: 'Dinner?',
    //     content: 'Are we still going out tonight?'
    //   },
    //   {
    //     image: 'assets/img/avatars/11.png',
    //     name: 'Jack',
    //     subject: 'Golf weekend',
    //     content: 'Hey! You wanted to go play Golf?'
    //   },
    //   {
    //     image: 'assets/img/avatars/12.png',
    //     name: 'Cody',
    //     subject: 'Code Quality',
    //     content: 'Love your newest theme, so clean and slick!'
    //   },
    //   {
    //     image: 'assets/img/avatars/13.png',
    //     name: 'James',
    //     subject: 'Party?',
    //     content: 'You wanna throw a party this weekend?'
    //   },
    //   {
    //     image: 'assets/img/avatars/14.png',
    //     name: 'Jessica',
    //     subject: 'Love you...',
    //     content: 'Hope we can see us again soon :)'
    //   }
    // ];

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
