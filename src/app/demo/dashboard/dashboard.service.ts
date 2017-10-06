import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import {DashboardComponent} from './dashboard.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor (private http: Http) {};

  getBlogs(limitStart) {
    console.log(limitStart);
    console.log(Cookie.get("ION_SERVER")+"/index.php?option=com_api&format=raw&app=easyblog&resource=latest&key="+Cookie.get("authkey")+"&user_id="+Cookie.get("category")+"&limitstart="+limitStart+"&limit=10");
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_api&format=raw&app=easyblog&resource=latest&key="+Cookie.get("authkey")+"&user_id="+Cookie.get("category")+"&limitstart="+limitStart+"&limit=10")
    .map((res:Response) => res.json());
  }
  getTheBlog(id)
    {
      console.log(Cookie.get("ION_SERVER")+"/index.php?option=com_api&app=easyblog&resource=blog&format=raw&id="+id+"&key="+Cookie.get("authkey"));
        return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_api&app=easyblog&resource=blog&format=raw&id="+id+"&key="+Cookie.get("authkey"))
        .map((res: Response) => res.json());
    }

    deleteblogser(id){
      return this.http.delete(Cookie.get("ION_SERVER")+"/index.php/?option=com_api&format=raw&app=easyblog&resource=blog&id="+id+"&key=178b5f7f049b32a8fc34d9116099cd706b7f9631")
      .map((res:Response)=>res.json());
    }
}
