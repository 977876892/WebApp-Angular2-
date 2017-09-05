import { Component } from '@angular/core';
import { User } from './user';
@Component ({
   selector: 'profile',
   templateUrl: './profile.html',
   styleUrls:['./css/style.css','./css/font-awesome.css']
})
export class ProfileComponent  {
 item = new User('','','','','');

   frmsubmit(item){

     //console.log("ok");
     console.log(item);
   }
}
