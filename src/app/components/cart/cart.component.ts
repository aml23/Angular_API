import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { CategotyService } from 'src/app/Services/categoty.service';
import { ProductApiService } from 'src/app/Services/product-api.service';
import { Icart } from 'src/app/ViewModels/icart';
import { ICategory } from 'src/app/ViewModels/icategory';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  categoryList:ICategory[]=[];
  selCatID:number=0;
  CartList:Icart[]=[];
  orderTotalPrice:number=0;
  @ViewChild(ProductsComponent) ProductsComponentObj!: ProductsComponent;

  constructor(private categoryService:CategotyService,
              private productService:ProductApiService) {
   // this.categoryList=this.categoryService.getAllCategories();

   }

  ngAfterViewInit(): void {
      for (let i = 0; i < this.CartList.length; i++)
      {
        for (let j = 0; j < this.ProductsComponentObj.ProductList.length; j++)
        {
          if(this.CartList[i].ProductName==this.ProductsComponentObj.ProductList[j].name &&
            this.ProductsComponentObj.ProductList[j].quantity!=0 &&
            this.ProductsComponentObj.ProductList[j].quantity>=this.CartList[i].ProductCount)
          {
            this.ProductsComponentObj.ProductList[j].quantity-=this.CartList[i].ProductCount;
          }
        }
      }
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(pl=>{
      console.log(pl);
      this.categoryList=pl;
    });
    console.log("pl");

  }

  addToCartList(product:Icart)
  {
    this.CartList.push({ProductName:product.ProductName,ProductCount:product.ProductCount,
            ProductPrice:product.ProductPrice});
            this.orderTotalPrice += product.ProductPrice*product.ProductCount;
  }

  removeFromCart(cartItem:Icart)
  {
    this.CartList.forEach((element,index)=>{
      if(element.ProductName == cartItem.ProductName)
      if (index > -1) {
        this.orderTotalPrice -= element.ProductPrice*element.ProductCount;
        this.CartList.splice(index, 1);
      }
   });

  }
}
