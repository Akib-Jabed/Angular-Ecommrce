import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appUser: AngularFireObject<AppUser>;

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid: string): Observable<AppUser> {
    this.appUser = this.db.object('users/' + uid);
    return this.appUser.valueChanges();
  }
}
