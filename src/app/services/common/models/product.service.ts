import { CreateProduct } from './../../../contracts/create-product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct,successCallBack?:any) {
    this.httpClientService.post({
      controller: "products",

    }, product).subscribe(result => {
      successCallBack();
    })
  }

}
