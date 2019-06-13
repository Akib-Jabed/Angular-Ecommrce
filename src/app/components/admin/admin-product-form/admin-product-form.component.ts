import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  categories$;
  product = {};
  productId;
  editable = false;

  constructor(private categoryService: CategoryService, private productService: ProductService,
              private router: Router, private route: ActivatedRoute) {
    this.categoryService.getCategories()
        .subscribe(c => this.categories$ = c);
    this.productId = this.route.snapshot.paramMap.get('id');
    if(this.productId) {
      this.editable = true;
      this.productService.getProduct(this.productId)
          .pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {

  }

  save(product) {
    if(this.productId)
      this.productService.updateProduct(this.productId, product);
    else
      this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    this.productService.deleteProduct(this.productId);
    this.router.navigate(['/admin/products']);
  }

}
