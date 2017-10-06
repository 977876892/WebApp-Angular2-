import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class VisitConfirmationDialog {
  constructor(public dialogRef: MdDialogRef<VisitConfirmationDialog>) {}

  public confirmMessage:string;
}
