import { RegisterModule } from './register/register.module';
import { BasketsModule } from './baskets/baskets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    ProductsModule,
    RegisterModule
  ]
})
export class ComponentsModule { }
