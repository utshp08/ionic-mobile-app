import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides, ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImageProviderService } from '../image-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = { 
    effect: 'flip', 
    pager: 'true'
   };
   lock = false;

   public SERVER_ADDRESS = "https://app-ionic-server.herokuapp.com"
   public step : number =  0.2;
   public default: string = "../../assets/icon/avatar.png";
   public profilePic;
   public registerForm: FormGroup;
   public uploaded = false;
   
  public base64Image: string;

  constructor(
    public actionSheet: ActionSheetController,
    public imagePicker: ImagePicker,
    public formBuilder : FormBuilder,
    public camera: Camera,
    public alertCtl : AlertController,
    public webview : WebView,
    private imageProvider: ImageProviderService,
    private loadingCtl : LoadingController
    )
    { }

  ngOnInit() {

  }
  
  
ngAfterViewInit() {
  // child is set
  this.slides.lockSwipes(true);
}

async showLoading(msg: any)
{
  var loading = await this.loadingCtl.create({
    message: msg,
    duration: 3000,
    spinner: "bubbles"
  });
  await loading.present();
}

dismissLoading()
{
  this.loadingCtl.dismiss();
} 

async showErr(msg)
{
  var alert = await this.alertCtl.create({
    message: msg,
    buttons: ['Dismiss']
  });

  alert.present();
}

private options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  saveToPhotoAlbum: true,
  allowEdit: true,
  targetWidth: 280,
  targetHeight: 280
}

async showImageFromCamera() {
  try {
    let rawImageFile = await this.getFilePathFromCamera();
    this.base64Image = this.webview.convertFileSrc(rawImageFile);
    this.showLoading("Uploading image")
    this.imageProvider.uploadPic(rawImageFile).then(img => {
      this.uploaded = true;
      this.dismissLoading();
    });
  } catch(error) {
    console.log(error);
  }
}

async getFilePathFromCamera() {
  const imagePath: string = await this.camera.getPicture(this.options);
  console.log(imagePath);
  return imagePath;
}

async imageSelect()
{
  var as = await this.actionSheet.create({
    header: 'Profile Picture',
    buttons: [{
      text: 'Select from gallery',
      handler: () => 
      {
        // open gallery to select image
        this.imagePicker.getPictures({
          quality: 100,
          maximumImagesCount: 1,
          width: 280,
          height: 280
        }).then((results) => {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
            this.base64Image = this.webview.convertFileSrc(results[i]);
            this.showLoading("Uploading image")
            this.imageProvider.uploadPic(results[i]).then(img => {
              this.uploaded = true;
                this.dismissLoading();
            });
        }
        }).catch(err => {})
      }
    }, {
      text: 'Use Camera',
      handler: () => {
        //open camera
        this.showImageFromCamera();
      }
    }]
  });
  await as.present();
}

notDefaultPic()
{
  return false
}

fieldNotEmpty()
{
  return false
}

next() {  
    this.slides.lockSwipes(false);  
    this.slides.slideNext(500).then(()=>{
        this.step += 0.2;
        this.slides.lockSwipes(true);
    });
  }
prev()
{
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500).then(()=>{
      this.step -= 0.2;
      this.slides.lockSwipes(true);
    });
  }

goToFinish() {
}    

}
