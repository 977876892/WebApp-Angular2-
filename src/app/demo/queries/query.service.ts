import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor (private http: Http) {};

  getQueries() {
   
    return this.http.get("http://www.dashboard.getion.in/index.php/request?module=easydiscuss&action=get&resource=posts&username=ramesh")
    .map((res:Response) => res.json());
  }

  getDetailQuery(id){
  
    return this.http.get("http://www.dashboard.getion.in/index.php/request?module=easydiscuss&action=get&resource=posts&id="+id)
    .map((res:Response) => res.json());
  }
  
    replyQuery(id,comment) {
        var headers = new Headers({'Content-Type':'application/X-www-form-urlencoded'});
          let body = new FormData();
          body.append('question_id',id);
          body.append('reply', comment);
          body.append('user_id', "180");
          body.append('username','ramesh');
          body.append('pwd','QFJhbWVzaDEyMyM=');
          body.append('encode',"true");
          return this.http.post("http://dashboard.getion.in/index.php/request?module=easydiscuss&action=post&resource=reply", body, headers)
          .map((res: Response) => res.json());
    };
}