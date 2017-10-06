import { Component, OnInit } from '@angular/core';
import { Lead } from './lead';
import { Http , Response } from '@angular/http';
import {LeadsService} from "../leads.service";
import { TagInputModule } from 'ngx-chips';
import {VisitService} from '../../visits/visit.service';
import {Router,ActivatedRoute,Params,ActivatedRouteSnapshot } from "@angular/router";
@Component({
  selector: 'ms-editor',
  templateUrl: './add_leads.component.html',
   providers: [LeadsService,VisitService]
})

export class AddLeadComponent implements OnInit {


  private tags:string="";
  constructor(private leadService:LeadsService,private route:Router,private visitService:VisitService) { }


  ngOnInit() {
  }
    lead = new Lead();

    // fileEvent(fileInput: any){
    // let file = fileInput.target.files[0];
    // let fileName = file.name;

    // console.log(fileName);
    //   }
  addLead(){
     
     console.log(this.lead);
     if(this.lead.department=="")
      {
        this.lead.department="Patient";
      }
     if(this.lead.tags.length!=0)
      {
          for(var i=0;i<this.lead.tags.length;i++)
            {
              this.tags +=this.lead.tags[i].value +",";
            }
      }
          if(this.lead.firstname!=""&&this.lead.lastname!=""&&typeof this.lead.phone!="undefined" && this.lead.email!="")
            {
                  this.leadService.saveLead(this.lead,this.tags).subscribe(data => {
                    console.log(data);
                    this.route.navigate(['/leads']);
                  });
            }
    
    }
   imageUploaded(src){
      //console.log(src);
    //   console.log(src.file);
    //  var fd = new FormData();
    //  fd.append('file',src.file);
    //  fd.append('userid', "180");
    //  fd.append('username','ramesh')
    //  fd.append('password','QFJhbWVzaDEyMyM=');
    //  fd.append('encode',"true");
    //  fd.append('auth_key','178b5f7f049b32a8fc34d9116099cd706b7f9631')

// username:ramesh
// password:QFJhbWVzaDEyMyM=
// encode:true
// auth_key:178b5f7f049b32a8fc34d9116099cd706b7f9631
     this.visitService.uploadImage(src).subscribe(data =>{
       console.log(data.url);
      this.lead.image=data.url;
    });    
  }



}
