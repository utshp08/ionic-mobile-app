import { Component, OnInit, Inject } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../providers/location/location.service';
import {Platform} from '@ionic/angular'

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})


export class LocationPage implements OnInit {

  private long:any;
  private lat:any;
  private position:Geoposition;
  
  constructor(
    private location     : Geolocation,
    private locationService                   : LocationService,
    private platform     : Platform
    ) { }

  ngOnInit() {
  }

  async enable_location() {
    let options = {
    timeout: 50000,
    enableHighAccuracy: true,
    }
    await this.platform.ready().then(() => {
       this.location.getCurrentPosition(options).then((pos:Geoposition) => {
        this.long = pos.coords.longitude;
        this.lat = pos.coords.latitude;
  
        this.locationService.sendCurrentPosition({longitude: this.long, latitude: this.lat}).subscribe(res => {
          console.log(res);
        })
      });
    });
  }
}
