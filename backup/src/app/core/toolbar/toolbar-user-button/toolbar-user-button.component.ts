import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;

  constructor(
     private router: Router
  ) { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
  logout(){
    Cookie.delete('username');
    Cookie.delete('password');
    Cookie.delete('ION_SERVER');
    this.router.navigate(['/']);
  }

}
