import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class visitsservice{
  constructor (private http: Http) {}

  getVisits()
  {
    return this.http.get('http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_bookings&list_type=daily&sd=2017-08-12&usr=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true&adm=1')
    .map((res:Response) => res.json());
  }

}
