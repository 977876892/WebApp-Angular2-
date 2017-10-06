import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './pipe';
@Injectable()

export class LeadsService{
  constructor (private http: Http) {}


  getLeads()
  {
    console.log(Cookie.get("ION_SERVER")+'/index.php/request/get/contacts/contacts?user_id='+Cookie.get("teamid")+'&username='+Cookie.get("username")+'&pwd='+btoa(Cookie.get("password"))+'&encode=true');
    return this.http.get(Cookie.get("ION_SERVER")+'/index.php/request/get/contacts/contacts?user_id='+Cookie.get("teamid")+'&username='+Cookie.get("username")+'&pwd='+btoa(Cookie.get("password"))+'&encode=true')
    .map((res:Response)=>res.json());
  }
   saveLead(newLead,tags)
  {
    var dob=new Date(newLead.dob);
    var finaldob=dob.getFullYear()+"-"+(dob.getMonth()+1)+"-"+dob.getDate();
     console.log(Cookie.get("ION_SERVER")+'/index.php/request/post/contacts/contacts?type='+newLead.department+'&age='+newLead.age+'&firstname='+newLead.firstname+'&surname='+newLead.lastname+"&image="+newLead.image+'&mobile='+newLead.phone+'&email='+newLead.email+'&dob='+finaldob+'&sex='+newLead.gender+'&area='+newLead.area+'&city='+newLead.city+'&remarks='+newLead.remarks+'&userid='+Cookie.get("teamid")+'&contactTags='+tags+'&tagflag=1');
     return this.http.post(Cookie.get("ION_SERVER")+'/index.php/request/post/contacts/contacts?type='+newLead.department+'&age='+newLead.age+'&firstname='+newLead.firstname+'&surname='+newLead.lastname+"&image="+newLead.image+'&mobile='+newLead.phone+'&email='+newLead.email+'&dob='+finaldob+'&sex='+newLead.gender+'&area='+newLead.area+'&city='+newLead.city+'&remarks='+newLead.remarks+'&userid='+Cookie.get("teamid")+'&contactTags='+tags+'&tagflag=1',"")
     .map((res:Response) => res.json());
   }
  updateLead(id,department,fname,surname,gender,phone,dob,email,locality,city,remarks,group,image){
    //console.log(Cookie.get("ION_SERVER")+'/index.php/request/put/contacts/contacts?id='+id+'&type='+department+'&age=25&firstname='+fname+'&surname='+surname+'&mobile='+phone+'&email='+email+'&dob='+dob+'&sex='+gender+'&purpose=&image=&area='+locality+'&city='+city+'&pincode=&remarks='+remarks+'&userid='+Cookie.get("teamid")+'&contactTags='+group+'&tagflag=1&username=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true');
    return this.http.put(Cookie.get("ION_SERVER")+'/index.php/request/put/contacts/contacts?id='+id+'&type='+department+'&age=25&firstname='+fname+'&surname='+surname+'&mobile='+phone+'&email='+email+'&dob='+dob+'&sex='+gender+'&purpose=&image='+image+'&area='+locality+'&city='+city+'&pincode=&remarks='+remarks+'&userid='+Cookie.get("teamid")+'&contactTags='+group+'&tagflag=1&username='+Cookie.get("username")+'&pwd='+btoa(Cookie.get("password"))+'=&encode=true',"")
   .map((res:Response)=>res.json());
  }
  uploadImage(fd)
  {
    return this.http.post(Cookie.get("ION_SERVER")+"/index.php/request?action=post&module=user&resource=upload",fd)
    .map((res:Response)=>res.json());
  }
}

