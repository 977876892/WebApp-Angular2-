import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class ComposeMsgService {

  constructor (private http: Http) {}

  getmsg(){
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php/request?module=contacts&action=searchTags&resource=contacts&user_id=180")
    .map((res:Response)=>res.json());
  }
}
