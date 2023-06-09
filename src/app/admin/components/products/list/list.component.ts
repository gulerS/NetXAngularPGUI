import { SelectProductImageDialogComponent } from './../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from './../../../../services/common/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertifyService, AlertLocation, AlertType } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { ListProduct } from './../../../../contracts/ListProduct';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);

  }
  displayedColumns: string[] = ['id', 'name', 'description', 'stock', 'price', 'createdDate', 'updatedDate', 'delete', 'photos', 'edit'];
  dataSource: MatTableDataSource<ListProduct> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  async getProducts() {



    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const response: { totalCount: number, products: ListProduct[] } = await this.productService.list(
      this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 2,

      () => { this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating) },
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOther: true,
        alertType: AlertType.Error,
        location: AlertLocation.BottomRight
      }))


    this.dataSource = new MatTableDataSource<ListProduct>(response.products);
    this.paginator.length = response.totalCount;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    });
  }



  async pageChanged() {
    await this.getProducts()
  }

  async ngOnInit() {
    await this.getProducts()
  }




}
