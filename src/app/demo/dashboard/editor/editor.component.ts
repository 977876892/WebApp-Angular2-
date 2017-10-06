import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {BlogsPostService} from "./editor.service";
import {Router,ActivatedRoute } from "@angular/router";
//import {Quill} from 'quill';
//import {Quill} from "../../../../node_modules/ngx-quill/node_modules/@types/quill/index.d"

@Component({
  selector: 'ms-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ],
  providers:[BlogsPostService]
})
export class ContentEditorComponent implements OnInit {
  
  text: string;
  content:string="";
  title:string="";
  blogid:number=0; 
  status:number=100;  //dummy status 100
  draft:number=3;
  ionize:number=4;
  publish:number=1;


  constructor(private blogsPostService:BlogsPostService,private route: Router,private activeRoute: ActivatedRoute) { }

  ngOnInit() {
     this.activeRoute.params.subscribe(params => {
       this.blogid = params['id']; // (+) converts string 'id' to a number
       this.status=params['status'];
       console.log(this.status);
       // In a real app: dispatch action to load the details here.
    });
      if(this.blogid!=0)
        {
             this.blogsPostService.getTheBlog(this.blogid).subscribe(data=>{
                console.log(data);
                this.title=data.title;
                this.content=data.textplain;
              });
        }
     
  }

  drftTheBlog(){
    if(this.blogid==0)
    {
        this.blogsPostService.postTheBlog(this.title,this.content,this.draft,this.blogid).subscribe(data=>{
            console.log(data);
            this.route.navigate(["/dashboard"]);
      });
    }
    else if(this.status==1){
        this.blogsPostService.postTheBlog(this.title,this.content,this.draft,this.blogid).subscribe(data=>{
            console.log(data);
            this.route.navigate(["/dashboard"]);
      });
    }
    else{
        
      this.blogsPostService.updateTheBlog(this.title,this.content,this.draft,this.blogid).then(data=>{
          console.log(data);
          this.route.navigate(["/dashboard"]);
      });
    }
    
  }
  ionizeTheBlog(){
  if(this.blogid==0)
    {
        this.blogsPostService.postTheBlog(this.title,this.content,this.ionize,this.blogid).subscribe(data=>{
            console.log(data);
            this.route.navigate(["/dashboard"]);
      });
    }
    else if(this.status==1){
        this.blogsPostService.postTheBlog(this.title,this.content,this.ionize,this.blogid).subscribe(data=>{
            console.log(data);
            this.route.navigate(["/dashboard"]);
      });
    }
    else{
        
      this.blogsPostService.updateTheBlog(this.title,this.content,this.ionize,this.blogid).then(data=>{
          console.log(data);
          this.route.navigate(["/dashboard"]);
      });
    }
  }
  publishTheBlog(){
   if(this.blogid==0)
    {
        this.blogsPostService.postTheBlog(this.title,this.content,this.publish,this.blogid).subscribe(data=>{
            console.log(data);
            this.route.navigate(["/dashboard"]);
      });
    }
    else if(this.status==1){
        this.blogsPostService.postTheBlog(this.title,this.content,this.publish,this.blogid).subscribe(data=>{
            console.log(data);
            this.route.navigate(["/dashboard"]);
      });
    }
    else{
        
      this.blogsPostService.updateTheBlog(this.title,this.content,this.publish,this.blogid).then(data=>{
          console.log(data);
          this.route.navigate(["/dashboard"]);
      });
    }
  }
}
