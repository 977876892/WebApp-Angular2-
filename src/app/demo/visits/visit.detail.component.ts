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
import {LeadsService} from "../leads/leads.service";
import { TagInputModule } from 'ngx-chips';
import {MdSnackBar} from '@angular/material';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!



@Component({
  selector: 'VisitDetailed',
  templateUrl: './visit.detail.component.html',
  styleUrls: ['./visit.component.scss'],
   providers: [VisitService,LeadsService] ,
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
  //private router: Router;
  private addComment:string;
  private id :String;
  private tags:String="";
  private newVisit=new NewVisitForm();
  private selectedDate:String;
  //form details
   private drTimeSlots:String;
   private newAppStatus:any;
  //form details

  drlist:any[];
  imageUploaded(src){
      //console.log(src);
      console.log(src.file);
    //  var fd = new FormData();
    //  fd.append('file',src.file);
    //  fd.append('userid', "180");
    //  fd.append('username','ramesh')
    //  fd.append('password','QFJhbWVzaDEyMyM=');
    //  fd.append('encode',"true");
    //  fd.append('auth_key','178b5f7f049b32a8fc34d9116099cd706b7f9631')

// username:ramesh
// password:QFJhbWVzaDEyMyM=
// encode:true
// auth_key:178b5f7f049b32a8fc34d9116099cd706b7f9631
     this.visitService.uploadImage(src).subscribe(data =>{console.log(
       data.url);
      this.newVisit.image=data.url;});    
  }
  onChange(selectedDoctor){
    console.log(selectedDoctor);
    this.newVisit.selectedDoctor=selectedDoctor.id_resources;
    this.newVisit.totalamount=selectedDoctor.rate;
  }
  onTimeChange(selectedTime){
  
      this.newVisit.startTime=selectedTime.timeslot_starttime;
      this.newVisit.endTime=selectedTime.timeslot_endtime;
  }
    dateChange(datechange){
      this.selectedDate=datechange.getFullYear()+"-"+(datechange.getMonth()+1)+"-"+datechange.getDate();
      this.newVisit.startDate=this.selectedDate;
      this.newVisit.endDate=this.selectedDate;
      this.visitService.getDrTimeslots(this.newVisit.selectedDoctor,this.selectedDate).subscribe(data => {this.drTimeSlots = data.data;
       console.log(data);
      });
    }
  constructor(private visitService: VisitService,private leadService:LeadsService,private route: Router,private snackBar: MdSnackBar) {
   }
  calculateAge (dateOfBirth, dateToCalculate) {
                var age = dateToCalculate.getFullYear() - dateOfBirth.getFullYear();
                var ageMonth = dateToCalculate.getMonth() - dateOfBirth.getMonth();
                var ageDay = dateToCalculate.getDate() - dateOfBirth.getDate();
                if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
                    age =age - 1;
                }
               this.newVisit.age=age;
        }
  addNewVisit(newVisit){
    this.newVisit=newVisit;
    console.log(this.newVisit);
    
    
        // console.log(this.newVisit);
        // console.log(this.newVisit.startTime);
        if(typeof this.newVisit.selectedDoctor=="undefined")
          {
               this.snackBar.open('Please Selcet Doctor!', 'Close', {
                          duration: 3000
                        });
          }else if(typeof this.newVisit.startDate=="undefined")
          {
               this.snackBar.open('Please Selcet Date!', 'Close', {
                          duration: 3000
                        });
          }
          else if(typeof this.newVisit.startTime=="undefined")
            {
                  this.snackBar.open('Please Selcet TimiSlot!', 'Close', {
                          duration: 3000
                        });
            }
            else if(this.newVisit.firstname!="" && this.newVisit.lastname!="" && this.newVisit.phone!="" && this.newVisit.email!="")
              {
                this.newVisit.department="Patient";
                if(this.newVisit.dob!=''&&typeof this.newVisit.dob!='undefined'){
                        this.calculateAge(new Date(this.newVisit.dob),new Date());
                }
                else if(typeof this.newVisit.age!='undefined'){
                      var today=new Date();
                      this.newVisit.dob=today.getFullYear()-this.newVisit.age+"/"+(today.getMonth()+1)+"/"+today.getDate();
                } 
                else{
                  this.newVisit.age=0;
                }       
                if(typeof this.newVisit.tags!="undefined")
                  {
                    for(var i=0;i<this.newVisit.tags.length;i++)
                      {
                        this.tags +=this.newVisit.tags[i].value +",";
                      }
                  }
                    if(typeof this.newVisit.depositamount=="undefined")
                    {
                          this.newVisit.depositamount=0;
                    }
                this.leadService.saveLead(this.newVisit,this.tags).subscribe(data => {
                          this.visitService.saveAppointment(this.newVisit,data.id)
                                .subscribe(data => {this.newAppStatus = data;
                                this.route.navigate(['/visits'])});
                });
              }
    
 
   }
  ngOnInit() {
if(Cookie.get("username")==null){
    this.route.navigate(['/']);
}
       this.visitService.getDrList().subscribe(data => {this.drlist = data.data;});
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
