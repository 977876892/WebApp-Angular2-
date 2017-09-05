import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username, password) {
        var headers = new Headers({'Content-Type':'application/X-www-form-urlencoded'});
         Cookie.set("ION_SERVER","http://staging.getion.in");
          //let options = new RequestOptions({ headers: headers });
          let body = new FormData();
          body.append('username',username);
          body.append('password',password);

          //var body = "username=ramesh&password=@Ramesh123#"

          return this.http.post(Cookie.get("ION_SERVER")+"/?option=com_api&app=users&resource=login&format=raw", body, headers)
          .map((res: Response) => res.json());

    }


}





