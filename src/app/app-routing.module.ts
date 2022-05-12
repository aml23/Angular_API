import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', component:MainlayoutComponent, children: [
    {path:'', redirectTo:'/Home', pathMatch:'full'},
    {path:'Home', component:HomeComponent},
    {path:'Aboutus',component:AboutUsComponent},
    {path:'contactus',component:ContactUsComponent},
    // {path:'Products', component:ProductsComponent},
    {path:'AddProduct', component:AddProductComponent},
    {path:'EditProduct/:productId', component:AddProductComponent},
    {path:'admin/insertproduct', component:AddProductComponent},
    // {path:'cart', component:CartComponent},
  //  {path:'Products/:pid', component:ProductDetailsComponent}
  ]},
    //{path:'Order', component:CartComponent},
    {
      path: 'product',
      loadChildren: () => import('src/app/Modules/product/product.module').then(p => p.ProductModule)
    },
    {
      path: 'user',
      loadChildren: () => import('src/app/Modules/user/user.module').then(u => u.UserModule)
    },
    // {path:'login', component:LoginComponent},
    // {path:'register', component:RegisterComponent},
    {path:'**', component:NotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
