import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './pipe';
@Injectable()

export class leadsService{
  constructor (private http: Http) {}


  getLeads()
  {
    return this.http.get('http://dashboard.getion.in/index.php/request/get/contacts/contacts?user_id=180&username='+Cookie.get("username")+'&pwd='+btoa(Cookie.get("password"))+'&encode=true')
    .map((res:Response)=>res.json(),console.log('http://dashboard.getion.in/index.php/request/get/contacts/contacts?user_id=180&username='+Cookie.get("username")+'&pwd='+btoa(Cookie.get("password"))+'&encode=true'));


  }

}

