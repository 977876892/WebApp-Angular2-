import { Component, OnInit } from '@angular/core';
// import {fadeInAnimation} from "../../route.animation";
// import {SortablejsOptions} from "angular-sortablejs";
import { LeadsService } from "./leads.service";
import { Http , Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Router} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import * as _ from 'underscore';
// import { Pipe, PipeTransform } from '@angular/core';
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/material';


@Component({
  selector: 'leads',
  templateUrl: './leads.component.html',
  providers : [LeadsService]


  //moduleId: module.id
})

export class LeadsComponent implements OnInit {



  constructor(private router: Router,
private http: Http ,public dialog: MdDialog,private leadsservice: LeadsService
  ) { }

leadsdItems :any[];
   pages : number;
   pageSize : number = 5;
   pageNumber : number = 0;
   currentIndex : number = 1;
   pageItems: any[];
   pagesIndex : Array<number>;
   pageStart : number = 1;
   inputName : string = '';

 openDialog(item) {
   console.log(item);
   var leadtags=[];
   if(item.leadsTags!="")
    {
      leadtags=item.leadsTags.split(",");
      if(leadtags[leadtags.length-1]=="")
        {

          leadtags.pop();
        }
    }

    let dialogRef:MdDialogRef<DialogOverviewExampleDialog> = this.dialog.open(DialogOverviewExampleDialog);
    dialogRef.componentInstance.id=item.id;
    dialogRef.componentInstance.fname = item.firstname;
    dialogRef.componentInstance.surname = item.surname;
    dialogRef.componentInstance.gender = item.sex;
    dialogRef.componentInstance.phone = item.mobile;
    dialogRef.componentInstance.email = item.email;
    dialogRef.componentInstance.city = item.city;
    dialogRef.componentInstance.locality = item.area;
    dialogRef.componentInstance.remarks = item.remarks;
    dialogRef.componentInstance.group = item.leadsTags;
    dialogRef.componentInstance.date = item.birthday;
    dialogRef.componentInstance.department = item.department;
    console.log(leadtags);
    dialogRef.componentInstance.tags=leadtags;
    dialogRef.componentInstance.image=item.image;
    dialogRef.afterClosed().subscribe(result => {
          console.log(result);
              if(result=="success")
                {
                      item.id=dialogRef.componentInstance.id;
                      item.firstname=dialogRef.componentInstance.fname;
                      item.surname=dialogRef.componentInstance.surname;
                      item.sex=dialogRef.componentInstance.gender;
                      item.mobile=dialogRef.componentInstance.phone;
                      item.email=dialogRef.componentInstance.email ;
                      item.city=dialogRef.componentInstance.city;
                      item.area=dialogRef.componentInstance.locality;
                      item.remarks=dialogRef.componentInstance.remarks;
                      item.leadsTags=dialogRef.componentInstance.finaltags ;
                      item.birthday=dialogRef.componentInstance.date;
                      item.department=dialogRef.componentInstance.department;
                      item.tags=dialogRef.componentInstance.finaltags;
                      item.image=dialogRef.componentInstance.image;
                }})
  }

   // array of all items to be paged
    private result: any[];
countpages:number;

  ngOnInit() {
    console.log(Cookie.get("username"));
  console.log(Cookie.get("password"));
  console.log(btoa(Cookie.get("password")));

     if(Cookie.get("username")==null){
              this.router.navigate(['/']);
          }
this.leadsdItems =[];
    this.leadsservice.getLeads().subscribe(res =>{
      console.log(res.description);
      this.leadsdItems = res.description;
      this.init();
    });

       this.countpages=this.pages=5;

  }

     init(){

// console.log(this.filteredItems.length);
          this.currentIndex = 1;
          this.pageStart = 1;
          // this.pages=5;

          // if(this.inputName!="")
          //   {
          //     this.pages=this.items.length;
          //   }
          //   else{
          //        this.pages = this.filteredItems.length;
          //   }



         this.pageNumber = parseInt(""+ (this.leadsdItems.length / this.pageSize));
         if(this.leadsdItems.length % this.pageSize != 0){
            this.pageNumber ++;
         }

         if(this.pageNumber  < this.pages){
               this.pages =  this.pageNumber;
         }

         this.refreshItems();
         console.log("this.pageNumber :  "+this.pageNumber);

   }
  FilterByName(){
    // console.log(this.filteredItems);
     //console.log(this.inputName);
     this.pageItems=[];
      //this.filteredItems = [];
      if(this.inputName != ""){
            this.leadsdItems.forEach(element => {
              //console.log(element.email);
              //console.log(element.email.toUpperCase().indexOf(this.inputName.toUpperCase()));
                if(element.email.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  console.log(element.email);
                  this.pageItems.push(element);
               }

            });
      }else{
         this.pageItems = this.leadsdItems;
      }
      //console.log(this.pageItems);
      console.log(this.pageItems.length);
      if(this.pageItems.length == 0){
         this.countpages=this.pages=0;
       }
        else{
            this.countpages=this.pages=5;
        }

 //console.log("count"+this.countpages);


      this.init();
   }
    fillArray(): any{
      var obj = new Array();
      for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                  obj.push(index);
      }
      return obj;
   }
 refreshItems(){
               if(this.inputName!='')
                {
                     this.pageItems = this.pageItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
                }else{
                     this.pageItems = this.leadsdItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
                }

               this.pagesIndex =  this.fillArray();



   }
    prevPage(){
      if(this.currentIndex>1){
         this.currentIndex --;
      }
      if(this.currentIndex < this.pageStart){
         this.pageStart = this.currentIndex;
      }
      this.refreshItems();
   }
   nextPage(){
      if(this.currentIndex < this.pageNumber){
            this.currentIndex ++;
      }
      if(this.currentIndex >= (this.pageStart + this.pages)){
         this.pageStart = this.currentIndex - this.pages + 1;
      }

      this.refreshItems();
   }
    setPage(index : number){
         this.currentIndex = index;
         this.refreshItems();
    }









}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
  providers : [LeadsService]
})
export class DialogOverviewExampleDialog {

id:string="";
fname:string="";
surname:string="";
gender:string="";
phone:string="";
email:string="";
city:string="";
locality:string="";
remarks:string="";
group:string="";
date:Date;
finaldob:String="";
department:string="";
tags:any[];
finaltags:string="";
image:'';
  constructor(private leadsservice: LeadsService,public thisDialogRef: MdDialogRef<DialogOverviewExampleDialog>){

  }
  imageUploaded(src){

      console.log(src.file);
     var fd = new FormData();
     fd.append('file',src.file);
     fd.append('userid', "180");
     fd.append('username','ramesh')
     fd.append('password','QFJhbWVzaDEyMyM=');
     fd.append('encode',"true");
     fd.append('auth_key','178b5f7f049b32a8fc34d9116099cd706b7f9631');
     this.leadsservice.uploadImage(fd).subscribe(data =>{console.log(
       data.url);
      this.image=data.url;});
  }
  updateLead(){
    console.log(this.tags);
    if(this.tags.length>0)
      {
         for(var i=0;i<this.tags.length;i++)
          {
            console.log(this.tags);
            if(typeof this.tags[i].value!="undefined")
              {
                  this.finaltags +=this.tags[i].value +",";
              }
                else{
                  if(this.tags[i]!="")
                  this.finaltags +=this.tags[i] +",";
                }

          }
      }
    this.date=new Date(this.date);
    if(this.date.toString()!="0000-00-00")
      {
       this.finaldob=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
      }
      else{
       this.finaldob=this.date.toString();
      }
     // console.log(this.finaltags);
     if(this.fname!="" && this.surname!="" && this.phone!=""&& this.email!="")
      {
        this.leadsservice.updateLead(this.id,this.department,this.fname,this.surname,this.gender,this.phone,this.finaldob,this.email,this.locality,this.city,this.remarks,this.finaltags,this.image)
        .subscribe(data => {
          console.log(data);
          this.thisDialogRef.close("success");
        });
      }





  }


}
