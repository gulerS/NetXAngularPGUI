import { DialogService } from './../dialog.service';

import { FileUploadDialogComponent, FileUploadDialogState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastrService, ToastrLocation, ToastrType } from './../../ui/custom-toastr.service';
import { AlertifyService, AlertType, AlertLocation } from './../../admin/alertify.service';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from './../http-client.service';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private httpclientService: HttpClientService,
    private alertify: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {

  }
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;


    const fileData: FormData = new FormData();
    for (const file of files) {

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {

        fileData.append(_file.name, _file, file.relativePath)

      })

    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpclientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData)
          .subscribe(data => {

            const message: string = "Upload successful";
            if (this.options.isAdminPage) {
              this.alertify.message(message, {
                dismissOther: true,
                alertType: AlertType.Success,
                location: AlertLocation.BottomRight
              })
            }
            else {
              this.customToastrService.message(message, "Success", {
                position: ToastrLocation.BottomRight,
                messageType: ToastrType.Success
              })
            }

          },
            (errorResonse: HttpErrorResponse) => {
              const message: string = "An error occurred while uploading the file(s)";
              if (this.options.isAdminPage) {
                this.alertify.message(message, {
                  dismissOther: true,
                  alertType: AlertType.Error,
                  location: AlertLocation.BottomRight
                })
              }
              else {
                this.customToastrService.message(message, "Error", {
                  position: ToastrLocation.BottomRight,
                  messageType: ToastrType.Error
                })
              }

            });

      }
    })


  }

  // openDialog(afterClose: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes) {
  //       afterClose();
  //     }
  //   });
  // }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;

  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
