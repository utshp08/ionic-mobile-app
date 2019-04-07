import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public logo = "../../assets/iDate.jpg";
  public loginForm: FormGroup;

  constructor(
    private  authService:  AuthService, 
    private  router:  Router,
    public alertCtrl: AlertController,
    public loadingCtrl : LoadingController,
    public formBuilder : FormBuilder
    ) {

      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        password: ['', Validators.call([Validators.maxLength(30)])]
      });

     }

  ngOnInit() {
  }

  async login(form){
    var loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: "Please wait...",
      duration: 3000
    });

    var err = await this.alertCtrl.create({
        message: "Invalid Authentication",
        animated: true,
        buttons: ["Dismiss"]  
    });

    await loading.present();

    this.authService.login(form.value).subscribe((res)=>{
      loading.onDidDismiss().then(() => {
        console.log(res.user);
        console.log(res.status);
        if(!res.user)
        {
          err.message = "Email not yet registered";
          err.present();
        } 
        else 
        {
          if(res.status) {
            this.router.navigateByUrl('home');
        } 
        else 
        {
          err.message = "Invalid password";
          err.present();
        }
      }
      });
    });
  }
  
}
