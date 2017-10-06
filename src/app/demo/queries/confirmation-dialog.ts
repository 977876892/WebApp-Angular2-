import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class QueryConfirmationDialog {
  constructor(public dialogRef: MdDialogRef<QueryConfirmationDialog>) {}

  public confirmMessage:string;
}
