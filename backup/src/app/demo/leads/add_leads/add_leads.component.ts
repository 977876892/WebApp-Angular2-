import { Component, OnInit } from '@angular/core';
import { Product } from './products';
import { Http , Response } from '@angular/http';
@Component({
  selector: 'ms-editor',
  templateUrl: './add_leads.component.html'
})

export class EditorComponent implements OnInit {



  constructor(
private http:Http
  ) { }


  ngOnInit() {
  }
    model = new Product('','','','','','','','','','','');

    fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    let fileName = file.name;

    console.log(fileName);
      }
  getLeads(model,fileName){
     console.log("hello");
     this.model=model;

     console.log(this.model.date);
     console.log('http://dashboard.getion.in/index.php/request/post/contacts/contacts?type=Doctor&age=24&firstname='+this.model.fname+'&surname='+this.model.lname+'&mobile='+this.model.number+'&email='+this.model.email+'&dob='+this.model.date+'&sex='+this.model.selectedValue+'&image=&area='+this.model.place+'&city='+this.model.city+'&remarks='+this.model.remark+'&userid=180&contactTags=head,&tagflag='+this.model.group);
      this.http.post('http://dashboard.getion.in/index.php/request/post/contacts/contacts?type='+this.model.sele+'&age=24&firstname='+this.model.fname+'&surname='+this.model.lname+'&mobile='+this.model.number+'&email='+this.model.email+'&dob='+this.model.date+'&sex='+this.model.selectedValue+'&image=&area='+this.model.place+'&city='+this.model.city+'&remarks='+this.model.remark+'&userid=180&contactTags='+this.model.group,'&tagflag=1')
      .subscribe((data)=> {

        console.log('received response');
      });


    }



}
