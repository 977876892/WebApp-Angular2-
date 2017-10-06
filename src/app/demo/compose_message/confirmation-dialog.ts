import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class ComposeMsgDialog {
  constructor(public dialogRef: MdDialogRef<ComposeMsgDialog>) {}

  public confirmMessage:string;
  public groupmsg:string;
}
