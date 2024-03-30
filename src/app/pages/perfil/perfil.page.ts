import {Component, Injector} from '@angular/core';
import {ClienteService} from '../../service/cliente.service';
import {BaseComponent} from '../../class/commons-class/base.component';
import {StorageService} from '../../service/storage.service';
import {ClienteDTO} from '../../class/dto/cliente.dto';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {API_CONFIG} from '../../config/api.config';
import {Cliente} from "../../class/cliente";
import {Endereco} from '../../class/endereco';
import {newArray} from '@angular/compiler/src/util';
import {Cidade} from '../../class/cidade';
import {Estado} from '../../class/estado';

@Component({
  selector: 'app-z',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage extends BaseComponent {

  cliente: Cliente;
  endereco: Endereco[] = [];
  cidade: Cidade;
  // estado: Estado;

  picture: string;
  profileImage: any = '';
  cameraOn: boolean = false;
  editImage: boolean = false;
  editUser: boolean = false;


  constructor(private injector: Injector,
              public navCtrl: NavController,
              public storage: StorageService,
              public clienteService: ClienteService,
              private camera: Camera,
              public sanitizer: DomSanitizer) {
    super(injector);
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    console.log("perfil page page");
    console.log(this.currentUser);

    this.cliente = this.currentUser;
    this.endereco[0] = this.currentUser.enderecos[0];
    this.endereco[0].cidade = this.currentUser.enderecos[0].cidade;

  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
          this.blobToDataURL(response).then(dataUrl => {
            let str: string = dataUrl as string;
            this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
          });
        },
        error => {
          this.profileImage = '/src/assets/imgs/logo.png';
        });
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
          this.picture = null;
          this.getImageIfExists();
          this.ionViewWillEnter();
        },
        error => {
        });
  }

  cancel() {
    this.picture = null;
  }

  cart() {
    this.navCtrl.navigateRoot('/cart');
  }

  editarImagem() {
    if (this.editImage == false) {
      this.editImage = true;
    } else {
      this.editImage = false;
    }
  }
  edicaoUsuario(){
    this.editUser = true;

  }
  cancelarEdicao(){
    this.editUser = false
  }

  salvarEdicao(){
    this.clienteService.update(this.currentUser).subscribe(cliente =>{
      console.log(cliente);
      this.editUser = false;
    })
  }
}
