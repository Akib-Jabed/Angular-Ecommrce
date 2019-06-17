import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cate;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(user => {
      if(!user) return;
      this.userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
  }
}
