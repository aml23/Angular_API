import { Injectable } from '@angular/core';
import { Icart } from '../ViewModels/icart';
import { ICategory } from '../ViewModels/icategory';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private categoryList:ICategory[]=[];
  constructor() {
    // this.categoryList=[{ID:1,Name:"t-shitrts"},{ID:2,Name:"dress"},{ID:3,Name:"dress2"}];
  }

  getCategories()
  {
    return this.categoryList;
  }
}
