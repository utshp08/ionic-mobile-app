import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSlide, Platform, LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import {RegisterMobilePage} from '../register-mobile/register-mobile.page';
import { Slide } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-option',
  templateUrl: './login-option.page.html',
  styleUrls: ['./login-option.page.scss'],
})

export class LoginOptionPage implements OnInit {


  @ViewChild(IonSlides) slide:  IonSlides;
  login:Boolean;
  slideOpts = {
    effect: 'flip',
    loop: true,
    autoplay: true
  };

  public pushpage = RegisterMobilePage;
  public SERVER_ADDRESS = "";

  constructor(
    public platform: Platform,
    private fb: Facebook,
    private route:Router,
    private nativeStorage: NativeStorage,
    private loadingCtl : LoadingController,
    private alertCtl : AlertController,
    private http: HTTP,
    private authService: AuthService
    ) 
    { 
      
    }

  async showAlert(msg:string)
  {
    let loading = await this.loadingCtl.create({
      message : msg,
      spinner: "circles",
      duration: 3000,
    });

    await loading.present();
  }

  ngOnInit() {
  }
  ionSlideDidLoad(){
    this.slide.options = this.slideOpts;
  }

  

  loginToFacebook()
  {
    this.authService.loginWithFacebook()
    .then(res => {
      let user = {
        id: res.id,
        name: res.name,
        email: res.email,
        picture: res.picture,
        sex: res.user_gender,
        bday: res.user_birthday,
        provider: res.provider
      }
      this.nativeStorage.setItem('facebook_user', user);
      this.authService.CreateOrRetrieveUser(user).subscribe(res => {
        console.log(res.status)
        if(!res.status)
        {
          this.route.navigate(["/profile"]);
        } else {
          this.route.navigate(["/login"]);
        }
      })
    })
    .catch(err => console.log(err));
  }
}
