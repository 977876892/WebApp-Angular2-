import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router,ActivatedRoute,Params,ActivatedRouteSnapshot } from "@angular/router";
import {UserService} from "./query.service";




@Component({
  selector: 'QueryDetailed',
  templateUrl: './query.detail.component.html',
  styleUrls: ['./query.component.scss'],
   providers: [UserService] ,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class QueryDetails implements OnInit, AfterViewInit {

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
  constructor(private userService: UserService,private route: ActivatedRoute) {
       
   }
  postComment($event,comment){
    this.userService.replyQuery(this.detailQuery[0].id,comment).subscribe(data => {//this.detailQuery = data.posts;
      console.log(data);
      this.addComment="";
      this.userService.getDetailQuery(this.id).subscribe(data => {this.detailQuery = data.posts;
      //console.log(data.posts);
    });
      //this.userService.getDetailQuery(this.id).subscribe(data => {this.detailQuery = data.posts;console.log(data.posts)});
    });
  }
  ngOnInit() {
if(Cookie.get("username")==null){
    this.router.navigate(['/']);
}
   //this.id= (this.route).snapshot.params.id;
    this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
   
    this.userService.getDetailQuery(this.id).subscribe(data => {this.detailQuery = data.posts;
      //console.log(data.posts);
    });
    
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
