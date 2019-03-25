import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from  './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import {LoadingController, App, Config, Platform,AlertController, DomController, Keyboard} from 'ionic-angular';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ HttpClientModule, AuthModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Keyboard,
    DomController,
    AlertController,
    Platform,
    Config,
    App,
    LoadingController,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
