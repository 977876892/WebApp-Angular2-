import {Component,OnInit} from '@angular/core';
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/material';
 import {ComposeMsgService} from "./compose_message_service";

@Component({
  selector: 'compose-message',
  templateUrl: './compose_message.html',
  providers:[ComposeMsgService]
})


export class ComposeMessageComponent implements OnInit{
constructor(public dialog: MdDialog,private composemsgservice:ComposeMsgService) {}

allTitles=[];
getTitles:any[];
groupData:any[];
dropdownListdata:any[];
dropdownSettings = {};

ngOnInit(){
       this.composemsgservice.getmsg()
       .subscribe(data=>{
       this.groupData=data.description;
          for(let i=0;i<this.groupData.length;i++){
            this.getTitles=this.groupData[i].title;

                this.allTitles.push(
                    {
                      "id":i,
                      "itemName": this.getTitles
                    }

                );
          }
           //console.log(this.getdata);
       });
           console.log(this.allTitles);

  this.dropdownSettings = {
                            singleSelection: false,
                            text:"Select Group",
                            selectAllText:'Select All',
                            unSelectAllText:'UnSelect All',
                            enableSearchFilter: true,
                            classes:"myclass custom-class"
                          };
    }
  selectTitle=[];
  onItemSelect(item:any){
      console.log(item.itemName);
      this.selectTitle.push(item.itemName);
      console.log(this.selectTitle);

  }
  OnItemDeSelect(item:any){
      console.log(item);
  }
  onSelectAll(items: any){
      console.log(items);
  }
  onDeSelectAll(items: any){
      console.log(items);
  }
  sendMsg(textMsg){
    console.log('hello');
    console.log(textMsg);
 console.log(this.selectTitle);
  }
}
