import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs/internal/observable/timer';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss']
})
export class AppComponent {

  showSplash = true;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,
    modalCtr : ModalController
  ) {
    this.initializeApp();
    platform.ready().then(()=>{
      statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false) 

      // let splash = modalCtr.create(splash).then(s => {
      //   s.present();
      // })
    });

    this.platform.ready().then(() => {
      this.nativeStorage.getItem('facebook_user')
      .then(data => {
        // this.router.navigate(["/profile"]);
        this.splashScreen.hide();
      }, err => {
        this.router.navigate(["/login-option"]);
        this.splashScreen.hide();
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
}
