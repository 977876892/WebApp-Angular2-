import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/map';

@Injectable()
export class VisitService {

  constructor (private http: Http) {};

  getVisits(passDate) {
     console.log(passDate);
     console.log(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_bookings&list_type=daily&sd="+passDate+"&usr="+Cookie.get("username")+"&pwd="+btoa(Cookie.get("password"))+"&encode=true&adm=1");
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_bookings&list_type=daily&sd="+passDate+"&usr="+Cookie.get("username")+"&pwd="+btoa(Cookie.get("password"))+"&encode=true&adm=1")
    .map((res:Response) => res.json());
  }
 getDrList(){
   return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_adm_resources&usr="+Cookie.get("username")+"&pwd="+btoa(Cookie.get("password"))+"&encode=true&adm=1")
   .map((res:Response) => res.json());
 }
  getDrTimeslots(res_id,datechange){
    console.log(datechange);
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=get_timeslots&admin=Yes&res_id="+res_id+"&ts_date="+datechange+"&usr="+Cookie.get("username")+"&pwd="+btoa(Cookie.get("password"))+"&encode=true&adm=1")
    .map((res:Response) => res.json());
  }
  saveAppointment(newVisit,id)
  {
     return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=insertBooking"+
        "&res_id="+newVisit.selectedDoctor+"&ce_id="+id+"&name="+newVisit.firstname+" "+newVisit.lastname+"&email="+newVisit.email+"&phone="+newVisit.phone+"&startdate="+newVisit.startDate+"&starttime="+newVisit.startTime+
        "&enddate="+newVisit.endDate+"&endtime="+newVisit.endTime+"&booked_seats=1&comment=&coupon_used="+
        "&credit_used=0&booking_deposit="+newVisit.depositamount+"&booking_total="+newVisit.totalamount+"&request_status="+newVisit.status+"&fa=No&user_id="+Cookie.get("userid"))
        .map((res:Response) => res.json());
  }
  uploadImage(src)
  {

     var fd = new FormData();
     fd.append('file',src.file);
     fd.append('userid', "180");
     fd.append('username',Cookie.get("username"))
     fd.append('password',btoa(Cookie.get("password")));
     fd.append('encode',"true");
     fd.append('auth_key',Cookie.get("authkey"));

    return this.http.post(Cookie.get("ION_SERVER")+"/index.php/request?action=post&module=user&resource=upload",fd)
    .map((res:Response)=>res.json());
  }
   updateVisit(req_id,res_id,startdate,enddate,starttime,endtime,ce_id,booking_deposit,req_status,name,phone,email,booking_total,booking_due)
    {
        return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=adm_update_booking&req_id="+req_id+"&photo=&res_id="+res_id+"&startdate="+startdate+"&starttime="+starttime+"&enddate="+enddate+"&endtime="+endtime+"&ce_id="+ce_id+
            "&comment=byprakash&booking_deposit="+booking_deposit+"&request_status="+req_status+"&payment_status=pending&name="+name+"&phone="+phone+"&email="+email+"&booking_total="+booking_total+"&booking_due="+booking_due+"&usr="+Cookie.get("username")+"&pwd="+btoa(Cookie.get("password"))+"&encode=true")
        .map((res:Response)=>res.json());
    };

    deletevisitsservice(id){
      console.log(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=delete_visits&usr="+Cookie.get("username")+"&pwd="+Cookie.get("password")+"&encode=true&id="+id);
        return this.http.delete(Cookie.get("ION_SERVER")+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=delete_visits&usr="+Cookie.get("username")+"&pwd="+btoa(Cookie.get("password"))+"&encode=true&id="+id)
        .map((res:Response)=>res.json());
    }
}
