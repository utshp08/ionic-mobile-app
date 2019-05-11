import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Http } from '@angular/http';
import { Router } from  "@angular/router";
import { NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private  authService:  AuthService, private  router:  Router, private nativeStroge: NativeStorage)
  {
    if(!this.authService.isLoggedIn())
    {
      this.router.navigateByUrl('login-option');
      console.log('You are not authenticated.');
    }
  }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigateByUrl('login-option');
    });
  }
}
