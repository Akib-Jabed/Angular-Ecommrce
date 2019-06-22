import { Product } from './../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      'dateCreated': new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-cart/' + cartId).valueChanges();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product$) {
    let product: Product = {
      key: product$.key,
      title: product$.payload.val().title,
      category: product$.payload.val().category,
      price: product$.payload.val().price,
      imageUrl: product$.payload.val().imageUrl
    };
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if(item) {
        item$.update({quantity: item.quantity + 1});
      }
      else {
        item$.set({product: product, quantity: 1});
      }
    });
  }
}
