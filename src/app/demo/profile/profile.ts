import { Component,Inject } from '@angular/core';
import { User } from './user';
import { Http,RequestOptions,Headers,Response  } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/map';
import {ProfileService} from './profile.service';
import { Observable } from 'rxjs/Observable';
import {MdDialog, MdDialogRef,MD_DIALOG_DATA} from '@angular/material';


@Component ({
   selector: 'profile',
   templateUrl: './profile.html',
   styleUrls:['./css/style.css','./css/font-awesome.css'],
   providers:[ProfileService]

})
export class ProfileComponent {
constructor (private ProfileService: ProfileService,private http:Http,public dialog: MdDialog) {

}
ngOnInit(){
  this.item.fname=Cookie.get("fname");
  this.item.lname=Cookie.get("lname");
  this.item.email=Cookie.get("email");
  this.item.mobile=Cookie.get("phone");
  this.item.aboutme=Cookie.get("aboutme");
  this.item.role=Cookie.get("role");
  if(this.item.role== "null"){
     this.item.role="";
  }
}
item=new User();
//  frmsubmit(item){
//    console.log(item);
//     this.ProfileService.frmsubmit(item).subscribe(data => {
//            console.log(data);
//            console.log("success");
//            Cookie.set("aboutme",item.aboutme);
//             Cookie.set("fname",item.fname);
//             Cookie.set("lname",item.lname);
//             Cookie.set("email",item.email);
//             Cookie.set("phone",item.mobile);
//             Cookie.set("role",item.role);

//               });
//    }
frmsubmit(item): void {


       let dialogRef = this.dialog.open(ProfileDialogOverviewExampleDialog, {});



    dialogRef.afterClosed().subscribe(result => {
      console.log(item);
      this.ProfileService.frmsubmit(item).subscribe(data => {
           console.log(data);
           console.log("success");
           Cookie.set("aboutme",item.aboutme);
            Cookie.set("fname",item.fname);
            Cookie.set("lname",item.lname);
            Cookie.set("email",item.email);
            Cookie.set("phone",item.mobile);
            Cookie.set("role",item.role);

              });
      console.log('form submite');

    });

  }


}




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class ProfileDialogOverviewExampleDialog {

  constructor(
    public dialogRef: MdDialogRef<ProfileDialogOverviewExampleDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }


   onOkClick():void{
     this.dialogRef.close();
   }
}


