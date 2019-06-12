import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private fireAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = fireAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.fireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
              .pipe(switchMap(user => {
                if(user)
                  return this.userService.getUser(user.uid);
                return of(null);
              }))
  }
}
