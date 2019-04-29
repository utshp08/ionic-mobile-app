import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSlide, Platform, LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import {RegisterMobilePage} from '../register-mobile/register-mobile.page';
import { Slide } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../providers/user/user.service';

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
    private authService: AuthService,
    private userService: UserService
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

  dismissAlert(){
    this.loadingCtl.dismiss();
  }

  ngOnInit() {
  }
  ionSlideDidLoad(){
    this.slide.options = this.slideOpts;
  }

  

  loginToFacebook()
  {
    this.authService.loginWithFacebook()
    .then(user => {

      //First, the app will check whether or not the user fb account is already registered
      //If not, app will redirect to profile to complete for the info then save, If yes, 
      //Server will accept the request and send token
      //Response from the server will now be save on the native storage including the registered user info and token
      this.showAlert("").then(() => {
        this.userService.RetrieveUser(user).subscribe(res => {
          //check if there is already registered user. If
          console.log("user:" + res.status);
          if(!res.status) // no, save facebook account of user, then
          {
            this.route.navigate(["/profile"]); // navigate to profile page to save the new user. Else
          } else {
            console.log(res.user);
            this.nativeStorage.setItem('logged_in_user', res.user);
            this.route.navigate(["/location"]); // if there is already user account
          }
            this.userService.setData(res.user);
        });
      }).finally(() => this.dismissAlert());

    })
    .catch(err => console.log(err));
  }
}
