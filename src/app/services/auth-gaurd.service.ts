import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(map(user => {
      if(user) return true;

      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    }));
  }
}
