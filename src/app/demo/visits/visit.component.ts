import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router} from "@angular/router";
import {VisitService} from "./visit.service";
import {LeadsService} from '../leads/leads.service'
import * as _ from 'underscore';
import {MdDialog,MdDialogConfig,MdDialogRef,MdSnackBar} from '@angular/material';
//import { MdSnackBar } from "@angular/material";
import{VisitConfirmationDialog} from "./confirmation-dialog";


@Component({
  selector: 'ms-visitdash',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
  providers: [VisitService,LeadsService] ,
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
  filterVisits:any[];
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;
  public nextDate;
  splitting:any[];


  constructor(private visitService: VisitService,private router: Router,public dialog: MdDialog,private snackBar: MdSnackBar) {
       this.allVisits=[];
       this.filterVisits=[];
   }
  openAddNewVisit()
  {
    this.router.navigate(['/visit-details']);
  }
   fetchAppointments(passDate){

      this.visitService.getVisits(passDate).subscribe(data => {
        this.nextDate=data.nextdate;
       // console.log();
        if(data.data.length==0&&this.nextDate!='')
          {
                this.loadMore();
          }
          else{
              this.allVisits = data.data;
              this.filterVisits=data.data;
            }

    });
   }
   loadMore(){
     this.fetchAppointments(this.nextDate);
   }

  ngOnInit() {
  this.fetchAppointmentsformtoday();
  }


    // deletevisits(id){
    //   console.log(id);
    //     this.visitService.deletevisitsservice(id)
    //     .subscribe(data=>{
    //       this.deletevisits=data;
    //       console.log(this.deletevisits);
    //         //location.reload();
    //     });

    // }
  dialogRef: MdDialogRef<VisitConfirmationDialog>;

deletevisits(id){
    console.log(id);
     this.dialogRef = this.dialog.open(VisitConfirmationDialog, {
      disableClose: false

    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
          console.log(id);
           this.visitService.deletevisitsservice(id)
        .subscribe(data=>{
          this.deletevisits= data;
          console.log(this.deletevisits);
        });

      }
      this.dialogRef = null;
    });
}

  selectdoctor(doc) {
    console.log(doc);

    console.log(this.filterVisits);
    this.allVisits = this.filterVisits.filter(book => (book.resource == doc && book.request_status=='new'));
    console.log(this.allVisits);
   }
 Doctors = [
    {resource: 8, resname: 'Dr Ramesh'},
    {resource: 203, resname: 'Dr Akshay'},
    {resource: 204, resname: 'Dr Manoj'}
  ];
  fetchAppointmentsformtoday()
  {
      var today=new Date();
      var passDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      this.fetchAppointments(passDate);
  }
  editDialog(book){

     let dialogRef:MdDialogRef<VisitDialogOverviewExampleDialog> = this.dialog.open(VisitDialogOverviewExampleDialog);
        dialogRef.componentInstance.firstname="";
        this.splitting=book.name.split(" ");
        //console.log(this.splitting.length);
        console.log(book);
         if(this.splitting.length>=2)
        {
            for(var i=0;i<this.splitting.length-1;i++)
            {
                 dialogRef.componentInstance.firstname=dialogRef.componentInstance.firstname+" "+this.splitting[i];
            }
             dialogRef.componentInstance.surname=this.splitting[this.splitting.length-1];
        }
        else{
            dialogRef.componentInstance.firstname=this.splitting[0];
             dialogRef.componentInstance.surname='';
        }

        dialogRef.componentInstance.res_id=book.resource;
        dialogRef.componentInstance.ce_id=book.ce_id;
        dialogRef.componentInstance.id=book.id;
        dialogRef.componentInstance.department="Patient";
        dialogRef.componentInstance.phone=book.mobile;
        dialogRef.componentInstance.total_amount=book.booking_total;
        dialogRef.componentInstance.amount_deposit=book.booking_deposit;
        dialogRef.componentInstance.amount_due=book.booking_due;
        dialogRef.componentInstance.email=book.email;
        dialogRef.componentInstance.dob=book.birthday;
        dialogRef.componentInstance.status=book.request_status;
        dialogRef.componentInstance.age=book.age;
        dialogRef.componentInstance.gender=book.sex;
        dialogRef.componentInstance.city=book.city;
        dialogRef.componentInstance.area=book.area;
        dialogRef.componentInstance.remarks=book.remarks;
        dialogRef.componentInstance.doctor=book.resname;
        dialogRef.componentInstance.timeslot=book.display_starttime;
        dialogRef.componentInstance.starttime=book.starttime;
        dialogRef.componentInstance.endtime=book.endtime;
        dialogRef.componentInstance.startdate=book.startdate;
        dialogRef.componentInstance.enddate=book.enddate;
        dialogRef.componentInstance.image=book.image;
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
              if(result=="success")
                {
                    // console.log(dialogRef.componentInstance.isCeId);
                    // console.log(dialogRef.componentInstance.firstname);

                    //image is remaining.
                    this.snackBar.open('Visit Updated Successfully!', 'Close', {
                          duration: 3000
                        });
                    if(dialogRef.componentInstance.isDateChanged)
                        {
                            this.fetchAppointmentsformtoday();
                            this.allVisits=[];
                        }
                    else{
                            book.ce_id=dialogRef.componentInstance.ce_id;
                            book.id=dialogRef.componentInstance.id;
                            book.name=dialogRef.componentInstance.firstname+" "+dialogRef.componentInstance.surname;
                            book.email=dialogRef.componentInstance.email;
                            book.mobile=dialogRef.componentInstance.phone;
                            book.res_id=dialogRef.componentInstance.res_id;
                            book.resname=dialogRef.componentInstance.doctor;
                            book.booking_total=dialogRef.componentInstance.total_amount;
                            book.booking_due=dialogRef.componentInstance.total_amount-dialogRef.componentInstance.amount_deposit;
                            book.booking_deposit=dialogRef.componentInstance.amount_deposit;
                            book.request_status=dialogRef.componentInstance.status;
                            book.startdate=dialogRef.componentInstance.startdate;
                            book.enddate=dialogRef.componentInstance.enddate;
                            book.endtime=dialogRef.componentInstance.endtime;
                            book.display_starttime=dialogRef.componentInstance.timeslot;
                            if(dialogRef.componentInstance.isCeId)
                              {
                                book.birthday=dialogRef.componentInstance.dob;
                                book.sex=dialogRef.componentInstance.gender;
                                book.city=dialogRef.componentInstance.city;
                                book.area=dialogRef.componentInstance.area;
                                book.remarks=dialogRef.componentInstance.remarks;
                                book.age=dialogRef.componentInstance.age;
                                book.image=dialogRef.componentInstance.image;
                              }
                              else{
                                book.birthday='';
                                book.sex='';
                                book.city='';
                                book.area='';
                                book.remarks='';
                                book.age='';
                              }
                          }
                  }
      })

  }


  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './visit-update-dialog.html',
  providers: [VisitService,LeadsService]
})
export class VisitDialogOverviewExampleDialog {
  id:number;
  res_id:number;
  ce_id:number;
  department:String;
  firstname:string;
  surname:string;
  phone:string;
  total_amount:number;
  amount_deposit:number;
  amount_due:number;
  email:string;
  dob:string;
  status:string;
  age:number;
  gender:string;
  city:string="";
  area:string="";
  remarks:string="";
  doctor:string;
  timeslot:string;
  startdate:string;
  enddate:String;
  starttime:string;
  endtime:string;
  selectedDate:string;
  drTimeSlots:any[];
  image:string;
  isCeId:boolean=true;
  isDateChanged=false;
  constructor(private visitService: VisitService,private leadService:LeadsService,public thisDialogRef: MdDialogRef<VisitDialogOverviewExampleDialog>,private snackBar: MdSnackBar){

  }
   ngOnInit() {

    this.visitService.getDrTimeslots(this.res_id,this.startdate).subscribe(data => {this.drTimeSlots = data.data;

  });
  }
  imageUploaded(src){

     // console.log(src.file);
    //  var fd = new FormData();
    //  fd.append('file',src.file);
    //  fd.append('userid', "180");
    //  fd.append('username','ramesh')
    //  fd.append('password','QFJhbWVzaDEyMyM=');
    //  fd.append('encode',"true");
    //  fd.append('auth_key','178b5f7f049b32a8fc34d9116099cd706b7f9631')

     this.visitService.uploadImage(src).subscribe(data =>{console.log(
       data.url);
      this.image=data.url;});
  }
  calculateAge (dateOfBirth, dateToCalculate) {
                var age = dateToCalculate.getFullYear() - dateOfBirth.getFullYear();
                var ageMonth = dateToCalculate.getMonth() - dateOfBirth.getMonth();
                var ageDay = dateToCalculate.getDate() - dateOfBirth.getDate();
                if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
                    age =age - 1;
                }
               this.age=age;
        }
    update_visit(){

      var date=new Date(this.dob);

        if(this.dob.toString()!="0000-00-00"){
          console.log(this.dob);
                this.calculateAge(new Date(this.dob),new Date());
        }
        else if(typeof this.age!='undefined'){
              var today=new Date();
              this.dob=today.getFullYear()-this.age+"/"+(today.getMonth()+1)+"/"+today.getDate();
        }
        else{
          this.age=0;
        }
      if(this.timeslot=="Select Time")
        {
           this.snackBar.open('Time Slot Required', 'Close', {
                          duration: 3000
                        });
        }
        else if(this.firstname!="" && this.surname!="" && this.email!="" && this.phone!="")
          {
               this.leadService.updateLead(this.ce_id,this.department,this.firstname,this.surname,this.gender,this.phone,this.dob,this.email,this.area,this.city,this.remarks,this.age,this.image)
                .subscribe(data=>{
                  if(data.id==0)
                    {
                      this.isCeId=false;
                    }
                  this.visitService.updateVisit(this.id,this.res_id,this.startdate,this.enddate,this.starttime,this.endtime,this.ce_id,this.amount_deposit,this.status,this.firstname+" "+this.surname,this.phone,this.email,this.total_amount,this.amount_due)
                    .subscribe(data=>{console.log(data);
                    this.thisDialogRef.close("success");})
                });
          }

}
     dateChange(datechange){
      this.selectedDate=datechange.getFullYear()+"-"+(datechange.getMonth()+1)+"-"+datechange.getDate();
      this.isDateChanged=true;
      //console.log(this.timeslot);
      this.timeslot="Select Time";

      this.visitService.getDrTimeslots(this.res_id,this.selectedDate).subscribe(data => {this.drTimeSlots = data.data;
      console.log(data.data);});
    }
    onTimeChange(selectedTime){
      this.startdate=this.selectedDate;
      this.enddate=this.selectedDate;
      this.starttime=selectedTime.timeslot_starttime;
      this.endtime=selectedTime.timeslot_endtime;
      this.timeslot=selectedTime.startendtime;
  }
}
