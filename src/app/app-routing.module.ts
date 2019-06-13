import { AdminGaurdService } from './services/admin-gaurd.service';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AdminProductFormComponent } from './components/admin/admin-product-form/admin-product-form.component';

const routes: Routes = [
  // Accessible via All
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  // Only accessible for authenticated users
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGaurdService] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGaurdService] },
  { path: 'orders-success', component: OrderSuccessComponent, canActivate: [AuthGaurdService] },

  // Only accessible for admin
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGaurdService, AdminGaurdService] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGaurdService, AdminGaurdService] },
  { path: 'admin/products/new', component: AdminProductFormComponent, canActivate: [AuthGaurdService, AdminGaurdService] },
  { path: 'admin/products/:id', component: AdminProductFormComponent, canActivate: [AuthGaurdService, AdminGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
