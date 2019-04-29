import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs/internal/observable/timer';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AuthService } from './auth/auth.service';
 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss']
})
export class AppComponent {

  isLoggedIn = false;
  user:any;
  showSplash = true;
  SERVER_ADDRESS:String = environment.server_address;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,
    private facebook: Facebook,
    private authService: AuthService,
    modalCtr : ModalController
  ) {
    this.initializeApp();
    platform.ready().then(()=>{
      statusBar.styleDefault();
      
      //check whether there is already logged in user
      this.nativeStorage.getItem('logged_in_user')
      .then(data => {
        console.log(data);
        this.router.navigate(["/location"]);
        this.splashScreen.hide();
      }, err => {
        this.router.navigate(["/login-option"]);
        this.splashScreen.hide();
      });

      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false) 

      // let splash = modalCtr.create(splash).then(s => {
      //   s.present();
      // })
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
}
