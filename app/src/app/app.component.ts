import { Component } from '@angular/core';

import { Platform, ModalController, NavController } from '@ionic/angular';
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
    private navCtl : NavController,
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
        this.splashScreen.hide();
        // this.router.navigate(["/location"]);
        this.navCtl.navigateForward(["/location"]);
      }, err => {
        this.splashScreen.hide();
        // this.router.navigate(["/login-option"]);
        this.navCtl.navigateForward(["/home"]);
      });

      this.splashScreen.hide();

      timer(2000).subscribe(() => this.showSplash = false) 

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
