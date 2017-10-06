import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {fadeInAnimation} from "../../../route.animation";
import {AuthenticationService } from './authentication.service';
import {User} from './user';





@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ],
  providers:[AuthenticationService,User]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private user :User
  ) { }

  ngOnInit() {
    Cookie.set("ION_SERVER","http://dashboard.getion.in");
  }

  login() {
   this.loading = true;
   console.log(this.username);
   console.log(this.password);

        this.authenticationService.login(this.username, this.password)
            .subscribe(
                data => {
                  console.log(data);
                  Cookie.set("username", this.username);
                  Cookie.set("password", this.password);
                  Cookie.set("teamid",data.teamid);
                  Cookie.set("userid",data.id);
                  Cookie.set("authkey",data.auth);
                  Cookie.set("category",data.publishid);
                  Cookie.set("profile",data.profile_image);
                  Cookie.set("fname",data.firstname);
                  Cookie.set("lname",data.lastname);
                  Cookie.set("email",data.email);
                  Cookie.set("phone",data.phone);
                  Cookie.set("aboutme",data.aboutme);
                  Cookie.set("role",data.job_type);
                  this.router.navigate(['/dashboard']);

                },
                error => {
                   console.log("error");
                    this.loading = false;
                });
   if(Cookie.get("username")=='' && Cookie.get("password") == '' && Cookie.get("ION_SERVER")=='')
    {
    this.router.navigate(['/']);
    }

  }

}


