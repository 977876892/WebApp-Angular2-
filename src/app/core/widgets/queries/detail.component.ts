import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ms-query-detail-activity',
  templateUrl: './detail.component.html'
})
export class QueryDetailActivityComponent implements OnInit {

  @Input('detailQueries') detailQueries: any[];
  @Input('title') title: string = 'Recent Activities';
  @Input('subTitle') subTitle: string = 'Your daily news feed';
  //private queryDetailService:QueryDetailService;
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
