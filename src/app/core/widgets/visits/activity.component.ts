import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
//import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/material';
import {NewVisitForm} from "./visit";

@Component({
  selector: 'ms-activity-visits',
  templateUrl: './activity.component.html'
})
export class VisitActivityComponent implements OnInit {

  @Input('visits') visits: any[];

 
  isLoading: boolean = false;

 

  constructor(public dialog: MdDialog) {
   
  }

  editDialog(book){
     console.log(book);
     let dialogRef:MdDialogRef<VisitDialogOverviewExampleDialog> = this.dialog.open(VisitDialogOverviewExampleDialog);
    dialogRef.componentInstance.fname=book.name;
    dialogRef.componentInstance.lname=book.name;
    dialogRef.componentInstance.phone=book.mobile;
    dialogRef.componentInstance.total_amout=book.booking_total;
    dialogRef.componentInstance.amout_deposit=book.booking_deposit;
    dialogRef.componentInstance.amout_due=book.booking_due;
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
    dialogRef.componentInstance.startdate=book.startdate;


  }

  ngOnInit() {
  }

  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './visit-dialog.html',
})
export class VisitDialogOverviewExampleDialog {
  fname:string;
  lname:string;
  phone:string;
  total_amout:string;
  amout_deposit:string;
  amout_due:string;
  email:string;
  dob:string;
  status:string;
  age:string;
  gender:string;
  city:string;
  area:string;
  remarks:string;
  doctor:string;
  timeslot:string;
  startdate:string;
  constructor(){

  }
    update_visit(){

      console.log(this.fname);
      console.log(this.dob);
      var date=new Date(this.dob);
      var mydate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    console.log(mydate);
    }
}
