import { Injectable } from '@angular/core';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public cameraImage:string;

  constructor(
    private camera          :Camera,
    private webview         :WebView,
    private imagePicker     :ImagePicker,

    ) { }

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

  async getFilePathFromCamera() {
    const imagePath: string = await this.camera.getPicture(this.options);
    console.log(imagePath);
    return imagePath;
  }


  // Capture image from device camera and asign url to cameraImage
  async showImageFromCamera():Promise<any> {
    return await new Promise(resolve => {
      this.getFilePathFromCamera()
      .then(data => {
        this.cameraImage = this.webview.convertFileSrc(data);
        let dataImage = {
          filepath : data,
          image: this.cameraImage
        }
        resolve(dataImage);
      });
    })
  }

  //Get image from the gallery and asign to cameraImage

  async loadImageFromGallery():Promise<any>
  {
    return await new Promise(resolve => {
      this.imagePicker.getPictures({
          quality: 100,
          maximumImagesCount: 1,
          width: 320,
          height: 320
      })
      .then((results) => {
        let path:string;
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          path = results[i];
          this.cameraImage = this.webview.convertFileSrc(results[i]);
        }
        let dataImage = {
          filepath : path,
          image: this.cameraImage
        }
        resolve(dataImage);
    });
  });
  }
}
