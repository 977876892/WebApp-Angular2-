import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import {DashboardComponent} from './dashboard.component';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor (private http: Http) {};

  getBlogs() {
   
    return this.http.get("http://dashboard.getion.in/index.php?option=com_api&format=raw&app=easyblog&resource=latest&key=178b5f7f049b32a8fc34d9116099cd706b7f9631&user_id=65&from=2017-08-03 09:28:32&limitstart=0&limit=20")
    .map((res:Response) => res.json());
  }

}