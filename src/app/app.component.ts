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
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    })
  }
}
