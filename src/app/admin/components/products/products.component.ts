import { ListComponent } from './list/list.component';
import { CreateProduct } from './../../../contracts/CreateProduct';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);

  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
  }


  @ViewChild(ListComponent) listComponent: ListComponent
  createdProduct(createdProduct: CreateProduct) {
    this.listComponent.getProducts();
  }

}
