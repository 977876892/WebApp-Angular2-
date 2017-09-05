import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VisitService {

  constructor (private http: Http) {};

  getVisits(passDate) {
     console.log(passDate);
     console.log("http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_bookings&list_type=daily&sd="+passDate+"&usr=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true&adm=1");
    return this.http.get("http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_bookings&list_type=daily&sd="+passDate+"&usr=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true&adm=1")
    .map((res:Response) => res.json());
  }
 getDrList(){
   return this.http.get("http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_resources&usr=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true&adm=1")
   .map((res:Response) => res.json());
 }
  getDrTimeslots(res_id,datechange){
    return this.http.get("http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_timeslots&admin=Yes&res_id="+res_id+"&ts_date="+datechange+"&usr=ramesh&pwd=QFJhbWVzaDEyMyM=&encode=true&adm=1")
    .map((res:Response) => res.json());
  }
  saveAppointment(newVisit)
  {

     return this.http.get("http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=insertBooking"+
        "&res_id="+newVisit.selectedDoctor+"&ce_id=77169&name="+newVisit.firstname+" "+newVisit.lastname+"&email="+newVisit.email+"&phone="+newVisit.phone+"&startdate="+newVisit.selectedDate+"&starttime="+newVisit.startTime+
        "&enddate="+newVisit.selectedDate+"&endtime="+newVisit.endTime+"&booked_seats=1&comment=&coupon_used="+
        "&credit_used=0&booking_deposit="+newVisit.depositamount+"&booking_total="+newVisit.totalamount+"&request_status="+newVisit.status+"&fa=No&user_id=180");
         //console.log(url);
  }
  // getDetailQuery(id){

  //   return this.http.get("http://www.dashboard.getion.in/index.php/request?module=easydiscuss&action=get&resource=posts&id="+id)
  //   .map((res:Response) => res.json());
  // }

  //   replyQuery(id,comment) {
  //       var headers = new Headers({'Content-Type':'application/X-www-form-urlencoded'});
  //         let body = new FormData();
  //         body.append('question_id',id);
  //         body.append('reply', comment);
  //         body.append('user_id', "180");
  //         body.append('username','ramesh');
  //         body.append('pwd','QFJhbWVzaDEyMyM=');
  //         body.append('encode',"true");
  //         return this.http.post("http://dashboard.getion.in/index.php/request?module=easydiscuss&action=post&resource=reply", body, headers)
  //         .map((res: Response) => res.json());
  //   };
}
