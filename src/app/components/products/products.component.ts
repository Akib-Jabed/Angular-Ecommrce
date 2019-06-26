import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from './../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: Product[] = [];
  categoryName: string;
  showButton = true;
  shoppingCart;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: ShoppingCartService) {
    this.productService.getProducts()
        .pipe(switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        }))
        .subscribe(params => {
          this.categoryName = params.get('category');
          this.categoryName ?
            this.setProduct(this.products.filter(product => product.payload.val().category === this.categoryName)) :
            this.setProduct(this.products);
        });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.shoppingCart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setProduct(products) {
    this.filteredProducts = [];
    products.forEach(product => {
      this.filteredProducts.push({
        key: product.key,
        title: product.payload.val().title,
        price: product.payload.val().price,
        category: product.payload.val().category,
        imageUrl: product.payload.val().imageUrl
      });
    });
  }

}
