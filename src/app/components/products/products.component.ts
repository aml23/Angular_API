import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductApiService } from 'src/app/Services/product-api.service';
import { Icart } from 'src/app/ViewModels/icart';
import { IProduct } from 'src/app/ViewModels/iproduct';
import { Store } from 'src/app/ViewModels/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit ,OnChanges{

    myStore:Store;
    CartProduct:Icart;
    ProductList:IProduct[]=[];
    url:string="";

    @Input() receivedSelCatID:number=0;
    @Output() onAddToCart:EventEmitter<Icart>;

  constructor(private productapiservice:ProductApiService,private router:Router)
  {
    this.onAddToCart=new EventEmitter<Icart>();
    this.myStore={
      name:"shopingMinya",
      branches:["minya","assuit"],
      logo:"assets/icons/logo-01.png"
    }
    this.CartProduct={ProductName:"",ProductPrice:0,ProductCount:0};
  }

   newProductList:any=[];
  ngOnChanges(changes: SimpleChanges): void
  {
    if(this.receivedSelCatID==0)
    {
      this.productapiservice.getAllProducts().subscribe(pl=>{
        this.newProductList=pl;
      });
    }else
    {
      this.productapiservice.getProductsByCatID(this.receivedSelCatID).subscribe(pl=>{
        this.newProductList=pl;
      });
    }

  }

  updateCart(count:number,product:IProduct)
  {
    this.CartProduct.ProductName=product.name;
    this.CartProduct.ProductPrice=product.price;
    this.CartProduct.ProductCount=count;
    this.onAddToCart.emit(this.CartProduct);
  }
  ngOnInit(): void
  {
    this.productapiservice.getAllProducts().subscribe(pl=>{
      this.ProductList=pl;
    });
  }

  openProductDetails(pid:number)
  {
    this.router.navigate(['/product/Products',pid]);
  }

  decreaseQuentity(id:any)
  {
    console.log(id);

    this.ProductList.forEach(function(obj) {
      if (obj.id == id && obj.quantity>0) {
          obj.quantity=obj.quantity-1;

      }
  });
  }

  EditProduct(productid:number)
  {
    this.router.navigate(['/EditProduct',productid]);
  }

  DeleteProduct(productId:number)
  {
    if(confirm("Are you sure to delete this product ")) {
      this.productapiservice.deleteProduct(productId).subscribe(product=>{
        console.log("deleted...");
      });
    }

    if(this.receivedSelCatID==0)
    {
      this.productapiservice.getAllProducts().subscribe(pl=>{
        this.newProductList=pl;
      });
    }else
    {
      this.productapiservice.getProductsByCatID(this.receivedSelCatID).subscribe(pl=>{
        this.newProductList=pl;

      });

  }
}

}
