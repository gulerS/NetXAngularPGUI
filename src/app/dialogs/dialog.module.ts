import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DialogModule { }
