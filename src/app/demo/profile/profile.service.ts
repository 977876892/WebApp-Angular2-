import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class ProfileService {
    constructor(private http: Http) {}
    frmsubmit(item){
      console.log("http://staging.getion.in/index.php/request?action=profileupdate&module=ionize&resource=posts&user_id="+Cookie.get("user_id")+"&firstname="+item.fname+"&lastname="+item.lname+"&email="+item.email+"&phone="+item.mobile+"&role="+item.role+"&overview="+item.aboutme);
     return this.http.get("http://staging.getion.in/index.php/request?action=profileupdate&module=ionize&resource=posts&user_id="+Cookie.get("user_id")+"&firstname="+item.fname+"&lastname="+item.lname+"&email="+item.email+"&phone="+item.mobile+"&role="+item.role+"&overview="+item.aboutme)
     .map((res:Response) => res.json());

    }

}
