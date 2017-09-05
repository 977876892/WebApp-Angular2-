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
                  console.log(Cookie.get("username"));
                  console.log(Cookie.get("password"));
                  console.log(Cookie.get("ION_SERVER"));
                   // this.router.navigate([this.returnUrl]);
                   this.router.navigate(['/dashboard']);

                },
                error => {
                   // this.alertService.error(error);
                   console.log("error");
                    this.loading = false;
                });
   if(Cookie.get("username")=='' && Cookie.get("password") == '' && Cookie.get("ION_SERVER")=='')
    {
    this.router.navigate(['/']);
    }

  }

}


