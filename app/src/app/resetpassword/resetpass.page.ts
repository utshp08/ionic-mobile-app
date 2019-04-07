import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.html',
  styleUrls: ['./resetpass.scss'],
})
@Injectable()
export class ResetpassPage implements OnInit {

  AUTH_SERVER_ADDRESS:  string  =  'http://192.168.0.11:5000';

  constructor(private  http:  HttpClient, private  router:  Router, public alertCtr: AlertController) 
  { 

  }

  ngOnInit() {
  }

   resetpass(form)
  {
    console.log(form.value);
    return  this.http.post(`${this.AUTH_SERVER_ADDRESS}/forgot_password`, form.value).subscribe((res) => {
      console.log(res);
    });
  }

}
