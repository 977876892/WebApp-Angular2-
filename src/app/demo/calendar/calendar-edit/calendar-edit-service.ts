import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class CalendarEditService {

  constructor (private http: Http) {};

  getEvent(id) {
       
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php/request?action=fullview&module=ionplanner&resource=planner&userid=180&id="+id)
    .map((res:Response) => res.json());
  }
   allReplyToEvent(id,answer){
     return this.http.get(Cookie.get("ION_SERVER")+"/index.php/request?action=reply&module=ionplanner&resource=planner&id="+id+"&comment="+answer+"&usr=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true")
    .map((res:Response) => res.json());
  }

}