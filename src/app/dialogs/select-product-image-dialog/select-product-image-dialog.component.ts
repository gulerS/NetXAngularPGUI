import { DeleteDialogComponent, DeleteState } from './../delete-dialog/delete-dialog.component';
import { DialogService } from './../../services/common/dialog.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListProductImages } from './../../contracts/ListProductImages';
import { ProductService } from './../../services/common/models/product.service';
import { FileUploadOptions } from './../../services/common/file-upload/file-upload.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, Output, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef)
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "product",
    explanation: "Select image or drag here.",
    isAdminPage: true,
    queryString: `id=${this.data}`
  };

  images: ListProductImages[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom)
    this.images = await this.productService.getImages(this.data as string, () => this.spinner.hide(SpinnerType.BallAtom))
  }

  deleteImage(imageId: string) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        await this.productService.deleteImage(this.data as string, imageId, () => {
          $("#card-" + imageId).fadeOut(500);
          this.spinner.hide(SpinnerType.BallAtom)
        });
      }
    })


  }

}


export enum SelectProductImageState {
  Close
}
