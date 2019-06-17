import { Product } from './../../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{
  products: any[];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  rowsOnPage = 2;
  sortBy = "title";
  sortOrder = "asc";

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getProducts()
        .subscribe(products => {
          this.products = products;
          this.products.forEach(product => {
            console.log(product.key);
            this.filteredProducts.push({
              key: product.key,
              title: product.payload.val().title,
              price: product.payload.val().price,
              category: product.payload.val().category,
              imageUrl: product.payload.val().imageUrl
            });
          });
        });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
        this.products.filter(product => product.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
        this.products;
  }

}
