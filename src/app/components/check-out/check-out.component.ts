import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  totalItemCount: number;
  totalNetPrice: number;
  items: Item[] = [];
  cartSubsciption: Subscription;
  authSubcription: Subscription;
  userId: string;

  constructor(private cartService: ShoppingCartService, private router: Router,
    private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubsciption = cart$.subscribe((cart: Cart) => {
      this.totalItemCount = 0;
      this.totalNetPrice = 0;
      for(let item in cart.items) {
        this.items.push(cart.items[item]);
        this.totalItemCount += cart.items[item].quantity;
        this.totalNetPrice += cart.items[item].quantity * cart.items[item].product.price;
      }
    });
    this.authSubcription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubsciption.unsubscribe();
    this.authSubcription.unsubscribe();
  }

  orderShippment(form) {
    let order ={
      user: this.userId,
      datePlaced: new Date().getTime(),
      shipping: form.value,
      items: this.items.map(function(item)  {
        return {
          product: {
            title: item.product.title,
            imageUrl: item.product.imageUrl,
            price: item.product.price
          },
          quantity: item.quantity,
          totalPrice: item.quantity * item.product.price
        }
      })
    }
    let successOrder = this.orderService.palceOrder(order);
    this.router.navigate(['order-success/', successOrder.key]);
    form.reset();
  }

}
