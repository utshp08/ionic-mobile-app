import { Component, OnInit, Inject } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../providers/location/location.service';
import {Platform, NavController} from '@ionic/angular'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})


export class LocationPage implements OnInit {

  private long:any;
  private lat:any;
  finding_location = false;
  location_error = false;
  title="";
  msg="";
  
  constructor(
    private location          : Geolocation,
    private locationService   : LocationService,
    private platform          : Platform,
    private storage       : NativeStorage,
    private router            :Router,
    private diagnostic        : Diagnostic,
    private navCtl            : NavController
    ) {
      this.platform.ready().then(() => {
        this.checkDeviceGps();
      });
    }

  ngOnInit() {
  }

  async checkDeviceGps() : Promise<any> {
    this.location_error = false;
    this.title="Searching";
    this.msg="Your Nearby Partner"
    this.finding_location = true;
    let locationEnabled =  new Promise((resolve, reject) => {
      this.diagnostic.isLocationEnabled().then(state => {
        resolve (state);
      }).catch(err => reject(err));
    });

    let isEnable = await locationEnabled;
    if(isEnable)
    {
      this.send_user_location().then(()=>{
        timer(3000).subscribe(() => {
          // this.router.navigate(["/home"]);
          this.navCtl.navigateForward('/home');
        })
      });
    } else {
      this.location_error = true;
      this.title="Error";
      this.msg="Please turn on location service"
      this.finding_location = false;
    }
  }

  async send_user_location() {
    let user_id;
    this.storage.getItem("logged_in_user").then(user => {
      user_id = user._id;
    });

    let options = {
    timeout: 50000,
    enableHighAccuracy: true,
    }
    this.location.getCurrentPosition(options).then((pos:Geoposition) => {
      this.long = pos.coords.longitude;
      this.lat = pos.coords.latitude;
        
      this.locationService.sendCurrentPosition({longitude: this.long, latitude: this.lat, userid: user_id}).subscribe(res => {
          console.log(res);
        })
      });
  }
}
