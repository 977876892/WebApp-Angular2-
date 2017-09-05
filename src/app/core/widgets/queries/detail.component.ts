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
  
            
    //this.userService.getDetailQuery(this.id).subscribe(data => {this.detailQuery = data.posts;console.log(data.posts)});
    
          // var headers = new Headers({'Content-Type':'application/X-www-form-urlencoded'});
          // let body = new FormData();
          // body.append('question_id',this.detailQueries[0].id);
          // body.append('reply', comment);
          // body.append('user_id', 180);
          // body.append('username',uname);
          // body.append('pwd','QFJhbWVzaDEyMyM=');
          // body.append('encode',true);
          // //var body = "username=ramesh&password=@Ramesh123#"

          //               return this.http.post("http://dashboard.getion.in/?option=com_api&app=users&resource=login&format=raw", body, headers)
          //               .map((res: Response) => res.json());

    
  

  ngOnInit() {
  }
  
  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
