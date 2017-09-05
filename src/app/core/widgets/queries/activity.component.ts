import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ms-activity-queries',
  templateUrl: './activity.component.html'
})
export class QueryActivityComponent implements OnInit {

  @Input('questions') questions: any[];
  @Input('title') title: string = 'Recent Activities';
  @Input('subTitle') subTitle: string = 'Your daily news feed';

  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
