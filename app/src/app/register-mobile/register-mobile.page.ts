import { Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, IonSlide} from '@ionic/angular';
@Component({
  selector: 'app-register-mobile',
  templateUrl: './register-mobile.page.html',
  styleUrls: ['./register-mobile.page.scss'],
})
export class RegisterMobilePage implements OnInit {


  countryLists:Array<any>;
  public phonenumber: Number;
  public countrycode: Number;
  slideOpts = {
    pager : true,
    lockSwipes: true,
    effect: 'flip'

  }

  @ViewChild(IonSlides) slide: IonSlides;

  constructor() { 
  }

  ngOnInit() {
  }

  ngAfterViewInit()
  {
    this.slide.lockSwipes(true);
  }

  sendOtp()
  {
    this.slide.lockSwipes(false);
    this.slide.slideNext().then(() => {
      this.slide.lockSwipes(true);
    });
  }

  gotoPrev()
  {
    this.slide.lockSwipes(false);
    this.slide.slidePrev().then(() => {
      this.slide.lockSwipes(true);
    });
  }
}
