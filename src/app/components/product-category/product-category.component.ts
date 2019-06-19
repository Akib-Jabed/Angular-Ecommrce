import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  categories;
  categorySubscription: Subscription;
  @Input('category') categoryName;

  constructor(private categoryService: CategoryService) {
    this.categorySubscription = this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

}
