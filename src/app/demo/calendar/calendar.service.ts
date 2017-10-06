import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CalendarService {

  constructor (private http: Http) {};

  getAllEvents() {
       
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php/request?action=get&module=ionplanner&resource=planner&userid=180")
    .map((res:Response) => res.json());
  }
 

}