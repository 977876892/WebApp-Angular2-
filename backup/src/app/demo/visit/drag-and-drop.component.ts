// import { Component, OnInit } from '@angular/core';
// import {fadeInAnimation} from "../../route.animation";
// import {SortablejsOptions} from "angular-sortablejs";
// import { Http , Response } from '@angular/http';
// import { visitsservice } from './visit.service';
// import { Cookie } from 'ng2-cookies/ng2-cookies';
// import {Router} from "@angular/router";

// @Component({
//   selector: 'ms-drag-and-drop',
//   templateUrl: './drag-and-drop.component.html',
//   styleUrls: ['./drag-and-drop.component.scss'],
//   host: {
//     "[@fadeInAnimation]": 'true'
//   },
//   animations: [ fadeInAnimation ],
//   providers:[visitsservice]
// })
// export class visitsComponent implements OnInit {
// result="";
//   constructor(private visitsservice: visitsservice,private router: Router) { }
//   ngOnInit(){
//           if(Cookie.get("username")==null){
//               this.router.navigate(['/']);
//           }

//         this.visitsservice.getVisits().subscribe(res => this.result = res.data);

// }


// }
