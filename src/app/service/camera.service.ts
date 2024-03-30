import {Injectable} from '@angular/core';
import {Camera, DestinationType} from '@ionic-native/camera/ngx';
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera,
              private platform: Platform) {
  }

  getPictureFromCamera(destinationType: DestinationType = DestinationType.DATA_URL) {
    return this.getImage(this.camera.PictureSourceType.CAMERA, destinationType, true);
  }

  getPictureFromPhotoLibrary(destinationType: DestinationType = DestinationType.DATA_URL) {
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY, destinationType);
  }

  // This method takes optional parameters to make it more customizable
  getImage(pictureSourceType, destinationType?, crop = false, quality = 50, allowEdit = true, saveToAlbum = false) {
    let options = {
      quality: quality,
      destinationType: this.platform.is('android') ? ((destinationType) ? destinationType : this.camera.DestinationType.DATA_URL) : this.camera.DestinationType.NATIVE_URI,
      sourceType: pictureSourceType,
      allowEdit: allowEdit,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: saveToAlbum,
      correctOrientation: true
    };
    // If set to crop, restricts the image to a square of 600 by 600
    if (crop) {
      options['targetWidth'] = 1000;
      options['targetHeight'] = 1000;
    }
    return this.camera.getPicture(options).then((imageData) => {

      console.log('URI -> ' + imageData);

      return imageData;
    }, error => {
      console.log('CAMERA ERROR -> ' + JSON.stringify(error));
      throw error;
    });
  }
}
