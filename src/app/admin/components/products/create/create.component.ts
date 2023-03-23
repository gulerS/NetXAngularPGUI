import { FileUploadOptions } from './../../../../services/common/file-upload/file-upload.component';
import { AlertifyService, AlertType, AlertLocation } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from '../../../../contracts/CreateProduct';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private productService: ProductService,private alertify:AlertifyService) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "product",
    explanation: "Drag or Select product images.",
    isAdminPage: true,
    accept:".png, .gif, .jpg, .jpeg"
  }
  create(name: HTMLInputElement, description: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const create_product: CreateProduct = new CreateProduct();

    create_product.Name = name.value;
    create_product.Description = description.value;
    create_product.Stock = parseInt(stock.value);
    create_product.Price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
      this.alertify.message("Created Successfully", {
        dismissOther: true,
        alertType: AlertType.Success,
        location: AlertLocation.BottomRight
      });
      this.createdProduct.emit(create_product)

    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOther: true,
          alertType: AlertType.Error,
          location: AlertLocation.TopRight
        })

    });
  }
}
