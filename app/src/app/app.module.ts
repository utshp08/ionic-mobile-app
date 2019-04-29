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

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormBuilder } from '@angular/forms';

import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpModule, HttpClientModule, AuthModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Geolocation,
    NativeStorage,
    Facebook,
    HTTP,
    FileTransfer, 
    FileTransferObject,
    WebView,
    Camera,
    FormBuilder,
    ImagePicker,
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


