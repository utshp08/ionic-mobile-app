import { Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, IonSlide} from '@ionic/angular';
import { Observable } from 'rxjs';
import { Http} from '@angular/http';
import { LocationService } from '../providers/location/location.service';

@Component({
  selector: 'app-register-mobile',
  templateUrl: './register-mobile.page.html',
  styleUrls: ['./register-mobile.page.scss'],
})
export class RegisterMobilePage implements OnInit {


  countryLists:Array<any>;
  public pn: Number;
  public countrycode: Number;
  public phonenumber;
  public countries: string[];

  slideOpts = {
    pager : true,
    lockSwipes: true,
    effect: 'flip'

  }

  customActionSheetOptions: any = {
    header: 'Select Country',
  };

  @ViewChild(IonSlides) slide: IonSlides;

  constructor(private http: Http, private location: LocationService) { 
    this.initCountries();
  }

  async initCountries(){
    return await this.location.getCountries().subscribe(res => {
      this.countries = res;
    });
  }

  // openPicker() {
  //   this.selector.show({
  //     title: 'Select Your Contact',
  //     items: [
  //       this.dummyJson.days,
  //       this.dummyJson.people
  //     ],
  //     positiveButtonText: 'Choose',
  //     negativeButtonText: 'Nah',
  //     defaultItems: [ 
  //       { index: 0, value: this.dummyJson.days[4].description },
  //       { index: 1, value: this.dummyJson.people[1].description}
  //     ]
  //   }).then(
  //     result => {
  //       let msg = `Selected ${result[0].description} with ${result[1].description}`;
  //       let toast = this.toastCtrl.create({
  //         message: msg,
  //         duration: 4000
  //       });
  //       toast.present();
  //     },
  //     err => console.log('Error: ', err)
  //     );
  // }


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
