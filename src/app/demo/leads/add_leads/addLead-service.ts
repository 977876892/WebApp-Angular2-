import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LeadService {

  constructor (private http: Http) {};

  saveLead(newLead)
  {
    console.log(newLead);
    var dob=new Date(newLead.dateofbirth);
    var finaldob=dob.getFullYear()+"-"+(dob.getMonth()+1)+"-"+dob.getDate();
    console.log('http://dashboard.getion.in/index.php/request/post/contacts/contacts?type='+newLead.sele+'&age=24&firstname='+newLead.fname+'&surname='+newLead.lname+'&mobile='+newLead.number+'&email='+newLead.email+'&dob='+finaldob+'&sex='+newLead.gender+'&area='+newLead.area+'&city='+newLead.city+'&remarks='+newLead.remark+'&userid=180&contactTags='+newLead.tags+'&tagflag=1');
     return this.http.post('http://dashboard.getion.in/index.php/request/post/contacts/contacts?type='+newLead.sele+'&age=24&firstname='+newLead.fname+'&surname='+newLead.lname+'&mobile='+newLead.number+'&email='+newLead.email+'&dob='+finaldob+'&sex='+newLead.gender+'&area='+newLead.area+'&city='+newLead.city+'&remarks='+newLead.remark+'&userid=180&contactTags='+newLead.tags+'&tagflag=1',"")
     .map((res:Response) => res.json());
    //  return this.http.get("http://dashboard.getion.in/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=raw&task=insertBooking"+
    //     "&res_id="+newVisit.selectedDoctor+"&ce_id=77169&name="+newVisit.firstname+" "+newVisit.lastname+"&email="+newVisit.email+"&phone="+newVisit.phone+"&startdate="+newVisit.selectedDate+"&starttime="+newVisit.startTime+
    //     "&enddate="+newVisit.selectedDate+"&endtime="+newVisit.endTime+"&booked_seats=1&comment=&coupon_used="+
    //     "&credit_used=0&booking_deposit="+newVisit.depositamount+"&booking_total="+newVisit.totalamount+"&request_status="+newVisit.status+"&fa=No&user_id=180");
  }
}