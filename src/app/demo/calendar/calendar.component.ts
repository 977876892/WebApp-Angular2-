import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {MdDialog, MdSnackBar} from "@angular/material";
import {CalendarEditComponent} from "./calendar-edit/calendar-edit.component";
import {Subject} from "rxjs";
import {fadeInAnimation} from "../../route.animation";
import {CalendarService} from "./calendar.service";

@Component({
  selector: 'ms-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  providers:[CalendarService],
  animations: [ fadeInAnimation ]
})
export class CalendarComponent implements OnInit {

  view: string = 'day';

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  actions: any[] = [{
    label: '<i class="icon">mode_edit</i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="icon">delete</i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.snackBar.open('Deleted Event: ' + event.title);
      //this.handleEvent('Deleted', event);
    }
  }];
 
  viewDate: Date = new Date();
  allEvents:any[]=[];
  isDataAvailable:boolean=false;
  events: any[] =[];
  
  // [{
  //   start: this.viewDate,
  //   end: this.viewDate,
  //   title: 'A 3 day event',
  //   color: 'red',
  //   actions: this.actions
  // }, {
  //   start: this.viewDate,
  //   end: this.viewDate,
  //   title: 'A draggable one day event',
  //   color: 'yellow',
  //   actions: this.actions,
  //   draggable: true
  // }, {
  //   start: this.viewDate,
  //   end: this.viewDate,
  //   title: 'A long event that spans 2 months',
  //   color: 'blue'
  // }, {
  //   start: this.viewDate,
  //   end: this.viewDate,
  //   title: 'A draggable and resizable event',
  //   color: 'yellow',
  //   actions: this.actions,
  //   resizable: {
  //     beforeStart: true,
  //     afterEnd: true
  //   },
  //   draggable: true
  // }];
  getallEvents(){
    this.calendarService.getAllEvents().subscribe(data=>{
      //console.log(data);
      this.isDataAvailable=true;
      for(var i=0;i<data.description.length-1;i++)
      this.allEvents.push({
      id:data.description[i].id,
      start: new Date(data.description[i].start_date),
      end: new Date(data.description[i].end_date),
      title: data.description[i].title,
      color: 'red',
      //actions: this.actions
    }) });
    this.events=this.allEvents;
    

  }
    
  handleEvent(action: string, event: CalendarEvent): void {
    let dialogRef = this.dialogRef.open(CalendarEditComponent);
    dialogRef.componentInstance.event = event;
    console.log(event);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event.title = result.title;
        this.snackBar.open('Changed Event: ' + event.title);
        this.refresh.next();
      }
    });
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
     console.log(events);
    if (moment(this.viewDate).isSame(date, 'month')) {
      if (
        (moment(this.viewDate).isSame(date, 'day') && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.snackBar.open('Moved Event: \'' + event.title + '\' to ' + newEnd.getDate() + '.' + newEnd.getMonth() + '.' + newEnd.getFullYear());
    //this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }
  
  
  constructor(
    private dialogRef: MdDialog,
    private snackBar: MdSnackBar,
    private calendarService:CalendarService
  ) { }

  ngOnInit() {
    this.getallEvents();
    this.view="month"
  }

}
