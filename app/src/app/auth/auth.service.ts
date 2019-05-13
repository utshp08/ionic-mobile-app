import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { environment } from 'src/environments/environment';
import { Platform } from 'ionic-angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

AUTH_SERVER_ADDRESS:  string  =  environment.server_address
authenticationState  =  new BehaviorSubject(false);


  constructor(
  private httpClient    : HttpClient, 
  private storage       : Storage,
  private nativeStorage : NativeStorage,
  private fb            : Facebook,
  private platform      : Platform
  )
  {
    this.platform.ready().then(() => {
      this.checkToken();
    })
  }


  checkToken() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if(res)
      {
        this.authenticationState.next(true);
      }
    });
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authenticationState.next(true);
        }
      })
    );
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authenticationState.next(true);
        }
      })

    );
  }

  loginWithFacebook() : Promise<any> {

    var userID;
    var token;
    const permission = ['public_profile', 'email'];

    return new Promise((resolve, reject) => {
      this.fb.login(permission)
        .then((fbres: FacebookLoginResponse) => {
            // this.showAlert("Loading. Please wait...");
          if(fbres.status == "Connected")
          {
            userID = fbres.authResponse.userID;
            token = fbres.authResponse.accessToken
          
          this.fb.api("/me?fields=name,email", permission)
          .then(res => {
              res.picture = "https://graph.facebook.com/" + userID + "/picture?type=large";
              res.logs = "https://graph.facebook.com/" + userID;
              
              let user = {
                name : res.name,
                picture: res.picture,
                email: res.email,
                provider: {
                  id : userID,
                  type: "facebook"
                }
              }
              resolve(user);
              console.log(user)
          })
          .catch(err => {
            reject(err);
          });
        }
        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
      });
    })
  }

  async logout() {
    await this.nativeStorage.clear();
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    })
  }

  isLoggedIn() {
    return this.authenticationState.asObservable();
  }
}
