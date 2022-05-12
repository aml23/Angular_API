import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routesProduct:Routes=[
  {path:'', redirectTo:'Products', pathMatch:'full'},
  {path:'Products', component:ProductsComponent},
  {path:'Products/:pid', component:ProductDetailsComponent},
  {path:'cart', component:CartComponent},
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesProduct),
    FormsModule

 
  ]
})
export class ProductModule { }
