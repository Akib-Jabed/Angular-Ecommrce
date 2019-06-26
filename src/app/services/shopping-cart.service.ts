import { Cart } from './../models/cart';
import { Item } from './../models/item';
import { Product } from './../models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  items: Item[];


  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      'dateCreated': new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product$) {
    let product: Product = product$;
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: Item) => {
      if(item) {
        item$.update({quantity: item.quantity + 1});
      }
      else {
        item$.set({product: product, quantity: 1});
      }
    });
  }

  async removeFromCart(product$) {
    let product: Product = product$;
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: Item) => {
      if(item) {
        item$.update({quantity: item.quantity - 1});
      }
    });
  }
}
