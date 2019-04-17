import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageProviderService {

  SERVER_ADDRESS = "https://app-ionic-server.herokuapp.com"

  constructor(
    private transfer: FileTransfer,
    private http: HTTP
    ) 
    { }

uploadPic(path)
{
  let url = this.SERVER_ADDRESS + '/images';
  var targetPath = path;
  var opts:FileUploadOptions = {
    fileKey: 'image', 
    chunkedMode: false,
    mimeType: 'multipart/form-data',
    params: { 'desc': "Image from ifinder"}
  }

  const fileTransfer: FileTransferObject = this.transfer.create();

  return fileTransfer.upload(targetPath, url, opts);
}
}
