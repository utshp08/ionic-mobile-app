import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides, ActionSheetController, Platform, ToastController, LoadingController} from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

declare var cordova: any;

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
   public lastImage;
   public loading;
  public base64Image: string;
  
  SERVER_ADDRESS:  string  =  'http://app-ionic-server.herokuapp.com';

  constructor(
    public actionSheet: ActionSheetController,
    public imagePicker: ImagePicker,
    public formBuilder : FormBuilder,
    public camera: Camera,
    public platform: Platform,
    public file: File,
    public filePath: FilePath ,
    public transfer : FileTransfer,
    public toastCtrl: ToastController,
    public loadingCtl: LoadingController
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

        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

        // open gallery to select image
        // this.imagePicker.getPictures({
        //   quality: 100,
        //   maximumImagesCount: 10,
		    //   width: 800
        // }).then((results) => {
        //   for (var i = 0; i < results.length; i++) {
        //     console.log('Image URI: ' + results[i]);
        // }
        // }).catch(err => {})
      }
    }, {
      text: 'Use Camera',
      handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA);
        //open camera
        //this.openCamera();
      }
    }]
  });
  await as.present();
}


public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}


private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
async presentToast(text) {
  let toast = await this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = this.SERVER_ADDRESS;
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: FileTransferObject = this.transfer.create();
 
  this.loading = this.loadingCtl.create({
    message: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
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
