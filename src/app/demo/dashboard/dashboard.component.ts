import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
  lineChartInterpolatedDemoDataGenerator, discreteBarDemoDataGenerator,
  lineChartDemoDataGenerator, serverLoadDemoData, recentSalesDemoDataGenerator, pieChartDemoData, trafficSourcesDemoData
} from "../data/widgetDemoData.data";
import {fadeInAnimation} from "../../route.animation";
import {Router} from "@angular/router";
import {UserService} from "./dashboard.service";
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/material';
import{ConfirmationDialog} from "./confirmation-dialog"

@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
   providers: [UserService] ,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class DashboardComponent implements OnInit, AfterViewInit {


  allBlogs;
  limitStart=0;
   error:any[];
  constructor(private userService: UserService,private router: Router,public dialog: MdDialog) {
    this.allBlogs=[];
   }
dialogRef: MdDialogRef<ConfirmationDialog>;
  ngOnInit() {
if(Cookie.get("username")==null){
    this.router.navigate(['/']);
}
    this.userService.getBlogs(this.limitStart).subscribe(
      data => {
          this.limitStart=this.limitStart+10;
          console.log(data.data);
          this.allBlogs=data.data;
        },
      err => {
          console.log('Something went wrong!');
        }
  );

  }



deleteblog:any[];
  openDeleteConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: false

    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
          console.log(id);
          this.userService.deleteblogser(id)
          .subscribe(data=>{
            this.deleteblog=data;
            console.log(this.deleteblog);
            this.limitStart=0;
            this.allBlogs=[];
            this.moreBlogsLoaded();
          });
      }
      this.dialogRef = null;
    });
  }

   moreBlogsLoaded()
    {
        this.userService.getBlogs(this.limitStart).subscribe(data => {
        this.limitStart=this.limitStart+10;
        this.allBlogs=this.allBlogs.concat(data.data);
    });
    }
  openBlogView(blogid)
  {
    console.log(blogid);

      let dialogRef:MdDialogRef<BlogViewDialog> = this.dialog.open(BlogViewDialog);
      dialogRef.componentInstance.id=blogid;

  }
  // editor(){
  // this.router.navigate(['./content_editor']);
  // }
  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}
@Component({
  selector: 'blog-view-dialog',
  templateUrl: './blogView.html',
  providers : [UserService]
})
export class BlogViewDialog {

  id:string;
  title:string;
  content:string;
  constructor(public thisDialogRef: MdDialogRef<BlogViewDialog>,private userService: UserService){
  }
   ngOnInit() {
        this.userService.getTheBlog(this.id).subscribe(data => {
              //console.log(data);
              this.title=data.title;
              this.content=data.text;
    });

  }
  }


