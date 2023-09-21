import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) {}

  onClose(confirm?: boolean): void {
    this.dialogRef.close(confirm);
  }
}
