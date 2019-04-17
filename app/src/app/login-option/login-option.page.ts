import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSlide} from '@ionic/angular';
import {RegisterMobilePage} from '../register-mobile/register-mobile.page';
import { Slide } from 'ionic-angular';

@Component({
  selector: 'app-login-option',
  templateUrl: './login-option.page.html',
  styleUrls: ['./login-option.page.scss'],
})

export class LoginOptionPage implements OnInit {

  @ViewChild(IonSlides) slide:  IonSlides;

  slideOpts = {
    effect: 'flip',
    loop: true,
    autoplay: true
  };

  public pushpage = RegisterMobilePage;
  
  constructor() { }

  ngOnInit() {
  }

  ionSlideDidLoad(){
    this.slide.options = this.slideOpts;
  }


}
