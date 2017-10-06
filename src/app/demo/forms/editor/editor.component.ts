import { Component, OnInit } from '@angular/core';
//import Quill from "quill";
//import {fadeInAnimation} from "../../route.animation";

@Component({
  selector: 'ms-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  //animations: [  ]
})
export class EditorComponent implements OnInit {

  text: string;

  constructor() { }

  ngOnInit() {
  }

}
