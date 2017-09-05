import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";

@Component({
  selector: 'ms-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class ContentEditorComponent implements OnInit {

  text: string;

  constructor() { }

  ngOnInit() {
  }
  submit_editor(editor){
    console.log("hello");
    console.log(editor);
  }

}
