import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: Product[] = [];
  categoryName: string;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.productService.getProducts()
        .pipe(switchMap(products => {
          this.filteredProducts = this.products = products;
          return this.route.queryParamMap;
        }))
        .subscribe(params => {
          this.categoryName = params.get('category');
          this.filteredProducts = this.categoryName ?
            this.products.filter(product => product.payload.val().category === this.categoryName) :
            this.products;
        });
  }

  ngOnInit() {
  }

}
