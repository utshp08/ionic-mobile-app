import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSlide} from '@ionic/angular';
import {RegisterMobilePage} from '../register-mobile/register-mobile.page';

@Component({
  selector: 'app-login-option',
  templateUrl: './login-option.page.html',
  styleUrls: ['./login-option.page.scss'],
})

export class LoginOptionPage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };

  public pushpage = RegisterMobilePage;
  
  constructor() { }

  ngOnInit() {
  }


}
