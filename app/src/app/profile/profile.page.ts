import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides, ActionSheetController, AlertController, LoadingController, IonFab, IonFabButton, IonDatetime } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, MaxLengthValidator } from '@angular/forms';
import { ImageProviderService } from '../image-provider.service';
import {ImageService } from '../providers/image.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { UserService } from '../providers/user/user.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonFabButton) fabButton: IonFabButton;
  @ViewChild(IonDatetime) bdate:IonDatetime;

  slideOpts = { 
    effect: 'flip', 
    pager: 'true'
   };
   lock = false;

   public SERVER_ADDRESS = environment.server_address
   public step : number =  0.2;
   public default: string = "../../assets/icon/avatar.png";
   public profilePic;
   public registerForm: FormGroup;
   public uploaded = false;
   public genderType;
   public male:String;
   public female:String;
  public base64Image: String;
  private imageFilePath:String;
  public name:String;
  public email:String;
  public sex:String;
  public bday:Date
  private provider:{};

  constructor(
    public actionSheet: ActionSheetController,
    public formBuilder : FormBuilder,
    public alertCtl : AlertController,
    private imageProvider: ImageProviderService,
    private loadingCtl : LoadingController,
    private nativeStorage: NativeStorage,
    private router: Router,
    private imgService: ImageService,
    private authService: AuthService
    )
    { }

  ngOnInit() {
    this.authService.currentData.subscribe(data => {
      this.name = data["name"];
        this.email = data["email"];
        this.base64Image = data["picture"];
        this.provider = data["provider"];
        this.uploaded = true;
    });
    this.male = "tertiary";
    this.female = "tertiary";
  }

chooseGender(gender:String){
  this.genderType = gender;
  switch(this.genderType)
  {
    case "Male":
      this.male = "secondary";
      this.female = "tertiary";
      break;
    case "Female":
      this.female = "secondary";
      this.male = "tertiary";
  }
}


ngAfterViewInit() {
  // child is set
  //this.slides.lockSwipes(true);
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

async imageSelect()
{
  var as = await this.actionSheet.create({
    header: 'Profile Picture',
    buttons: [{
      text: 'Select from gallery',
      handler: () => 
      {
        //Load image service that handles operation for selecting images from the gallery
        this.imgService.loadImageFromGallery().then(data => {
          this.base64Image = data.image;
          this.imageFilePath = data.filepath
        });
      }
    }, {
      text: 'Use Camera',
      handler: () => {
        //open camera
        // this.showImageFromCamera();
        this.imgService.showImageFromCamera()
        .then(data => {
          this.base64Image = data.image;
          this.imageFilePath = data.filepath;
        })
      }
    }]
  });
  await as.present();
}

saveNewUser()
{
  let newUser = {
    name: this.name,
    email: this.email,
    picture: this.base64Image,
    gender: this.genderType,
    birthday: this.bdate.value,
    provider: this.provider
  }
  console.log(newUser);
  this.authService.CreateUser(newUser).subscribe(res => {
    if(res.status)
    {
      this.nativeStorage.setItem("logged_in_user", newUser).then(user =>{
          //Image provider handles uploading of images to the server
          this.showLoading("Uploading image").then(() => {
            this.imageProvider.uploadPic(this.imageFilePath)
            .then(() => {
              this.uploaded = true;
            });
          }).finally(() => {
            this.dismissLoading();
            this.router.navigate(["/home"]);
            this.authService.setData(newUser);
          });
      });
    }
  })
}

// notDefaultPic()
// {
//   return false
// }

// fieldNotEmpty()
// {
//   return false
// }

// next() {  
//     this.slides.lockSwipes(false);  
//     this.slides.slideNext(500).then(()=>{
//         this.step += 0.2;
//         this.slides.lockSwipes(true);
//     });
//   }
// prev()
// {
//     this.slides.lockSwipes(false);
//     this.slides.slidePrev(500).then(()=>{
//       this.step -= 0.2;
//       this.slides.lockSwipes(true);
//     });
//   }

// goToFinish() {
// }    

}
