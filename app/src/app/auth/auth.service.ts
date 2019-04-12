import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { HTTP } from  '@ionic-native/http/ngx';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

AUTH_SERVER_ADDRESS:  string  =  'http://app-ionic-server.herokuapp.com';
authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private  storage:  Storage, private http: HTTP)
  {

  }

  // login(user: User): Observable<AuthResponse> {
  //   return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
  //     tap(async (res: AuthResponse) => {

  //       if (res.user) {
  //         await this.storage.set("ACCESS_TOKEN", res.user.access_token);
  //         await this.storage.set("EXPIRES_IN", res.user.expires_in);
  //         this.authSubject.next(true);
  //       }
  //     })
  //   );
  // }

  login(user: User)
  {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.AUTH_SERVER_ADDRESS}/login`, user, { 'Content-type' : 'application/json' })
      .then(res => {
        resolve(res);
        console.log(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }


}
