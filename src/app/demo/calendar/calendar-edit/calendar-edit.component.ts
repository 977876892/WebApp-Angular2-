import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {CalendarEvent} from 'angular-calendar';
import {CalendarEditService} from './calendar-edit-service'
import * as moment from 'moment';


let eventDateFormat: string = 'DD.MM.YYYY, HH:mm';

@Component({
  selector: 'ms-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  providers:[CalendarEditService],
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent implements OnInit {
 // console.log()
  event: CalendarEvent;
  myevent:any;
  eventStart: string;
  eventEnd: string;
  questionWithResponse:any[];
  answer:string="";

  constructor(
    private dialogRef: MdDialogRef<CalendarEditComponent>,private calendarEditService:CalendarEditService
  ) { }

  ngOnInit() {
    this.event = this.dialogRef.componentInstance.event;
    console.log(this.event);
    this.myevent=this.event;
    this.calendarEditService.getEvent(this.myevent.id).subscribe(data=>{this.questionWithResponse=data.description;console.log(data.description);})
    //this.eventStart = moment(this.event.start).format(eventDateFormat);
    //this.eventEnd = moment(this.event.end).format(eventDateFormat);
  }

  save() {
    if(this.answer!="")
      {
           this.calendarEditService.allReplyToEvent(this.myevent.id,this.answer)
          .subscribe(data=>{
            this.answer="";
            this.calendarEditService.getEvent(this.myevent.id).subscribe(data=>{this.questionWithResponse=data.description;console.log(data.description);})
          
          });
    //console.log(this.answer);
      }
   
    // if (this.eventStart) {
    //   this.event.start = moment(this.eventStart, eventDateFormat).toDate();
    // }

    // if (this.eventEnd) {
    //   this.event.end = moment(this.eventEnd, eventDateFormat).toDate();
    // }

    // this.dialogRef.close(this.event);
  }
}
