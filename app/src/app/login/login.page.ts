import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth/auth.service';
import { AlertController} from 'ionic-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(
    private  authService:  AuthService, 
    private  router:  Router,
    public alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  login(form){
    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('home');
    });
  }
    
}
