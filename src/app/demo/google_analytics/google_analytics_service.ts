import { Injectable } from '@angular/core';
import { Http, Response ,Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()

export class GoogleAnalyticsService{
  constructor (private http: Http) {
 //console.log(Cookie.get("google_analytics_api"));
  }


  getDailyAnalytics()
  {
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_reports&fileout=yes&format=raw&task=get_adm_bookings&list_type=day&sd=2017-9-18&usr=ramesh&pwd=cmFtZXNo&encode=true")
    .map((res:Response)=>res.json());
  }
}
