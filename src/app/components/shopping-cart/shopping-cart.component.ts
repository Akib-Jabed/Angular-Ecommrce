import { Cart } from './../../models/cart';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  totalItemCount: number;
  itemIds: Item[];
  totalPrice: number;
  cart$: Cart;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe((cart: Cart) => {
      this.totalItemCount = 0;
      this.totalPrice = 0;
      this.itemIds = [];
      if(cart){
        this.cart$ = cart;
        for(let item in cart.items) {
          if(cart.items[item].quantity) {
            this.itemIds.push(cart.items[item]);
            this.totalItemCount += cart.items[item].quantity;
            this.totalPrice += cart.items[item].quantity * cart.items[item].product.price;
          }
        }
      }
    });
  }

  clearShoppingCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
