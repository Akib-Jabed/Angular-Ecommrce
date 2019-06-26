import { Cart } from './../../models/cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  appUser: AppUser;
  cartItemCount: number;

  constructor(private authService: AuthService, private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    let cartId = await this.cartService.getCart();
    cartId.subscribe((cart: Cart) => {
      this.cartItemCount = 0;
      for(let item in cart.items) {
        this.cartItemCount += cart.items[item].quantity;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
