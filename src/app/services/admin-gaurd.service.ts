import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurdService implements CanActivate{

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
    return this.authService.appUser$
              .pipe(
                map(appUser => appUser.isAdmin));
  }
}
