import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides, ActionSheetController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';


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
   public step : number =  0.2;
   public default: string = "../../assets/icon/avatar.png";
   public profilePic;
   public registerForm: FormGroup;
   
  public base64Image: string;

  constructor(
    public actionSheet: ActionSheetController,
    public imagePicker: ImagePicker,
    public formBuilder : FormBuilder,
    public camera: Camera
    ) {

   }


  ngOnInit() {

  }
  
  
ngAfterViewInit() {
  // child is set
  this.slides.lockSwipes(true);
}

openCamera(){
      
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
   }, (err) => {
    // Handle error
   });
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
          maximumImagesCount: 10,
		      width: 800
        }).then((results) => {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
        }
        }).catch(err => {})
      }
    }, {
      text: 'Use Camera',
      handler: () => {
        //open camera
        this.openCamera();
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
