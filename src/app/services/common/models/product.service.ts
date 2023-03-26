import { firstValueFrom, Observable } from 'rxjs';
import { ListProduct } from './../../../contracts/ListProduct';
import { CreateProduct } from '../../../contracts/CreateProduct';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "product"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async list(page: number = 0, take: number = 2, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number, products: ListProduct[] }> {
    const pData: Promise<{ totalCount: number, products: ListProduct[] }> = this.httpClientService.get<{ totalCount: number, products: ListProduct[] }>({
      controller: "product",
      queryString: `Page=${page}&Size=${take}`
    }).toPromise();

    pData.then(d=>successCallBack())
      .catch(d => ((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message)))

    return await pData;
  }


  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "product",
    }, id);

    await firstValueFrom(deleteObservable);
  }

}
