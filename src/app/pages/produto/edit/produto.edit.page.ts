import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../../class/commons-class/base.component';
import {CategoriaDTO} from '../../../class/dto/categoria.dto';
import {CategoriaService} from '../../../service/categoria.service';
import {ProdutoService} from '../../../service/produto.service';
import {PositionToast, ToastUtil} from '../../../class/commons-class/toast.util';
import {ToastType} from '../../../class/commons-class/toast.type';
import {Produto} from '../../../class/produto';
import {API_CONFIG} from '../../../config/api.config';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {Categoria} from '../../../class/categoria';

@Component({
  selector: 'produto-page',
  templateUrl: 'produto.edit.page.html',
  styleUrls: ['./produto.edit.page.scss']
})
export class ProdutoEditPage extends BaseComponent {

  produto: Produto;
  categorias: Categoria[] = [];
  picture: string;
  profileImage: any = '';
  cameraOn: boolean = false;
  editImage: boolean = false;
  editUser: boolean = false;

  constructor(private injector: Injector,
              private categoriaService: CategoriaService,
              private produtoService: ProdutoService,
              private camera: Camera,
              public sanitizer: DomSanitizer) {
    super(injector);

    this.activatedRoute.queryParams.subscribe(params => {
      let returnedObject = this.router.getCurrentNavigation().extras.state;
      if (returnedObject) {
        this.produto = returnedObject.produto;
      } else {
        this.produto = new Produto();
      }
    });


  }

  init() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.produto.idCliente = this.currentUser.id;

    this.carregaCategorias();
  }

  carregaCategorias() {
    this.categoriaService.findAll().subscribe((categoria) => {
      this.categorias = categoria;
    });
  }

  salvar() {
    if (this.validaCadastro()) {
      if (!this.produto.desconto) {
        this.produto.desconto = 100;
      }

      if (this.produto.id) {
        this.produtoService.update(this.produto).subscribe(item => {
          console.log('editou' + '-' + item.nome);
        });
      } else {
        this.produtoService.insert(this.produto).subscribe(item => {
          this.produto.categoria = item.categoria;
          console.log('salvou' + '-' + item.nome);
        });
      }

      this.navCtrl.navigateForward(`/produto/list`);

    } else {
      ToastUtil.presentToast(this.toastCtrl, 'Necessita dados', PositionToast.BOTTOM, ToastType.INFO, 500);
    }
  }


  validaCadastro() {
    //TODO VALIDAR

    let erros: string[];
    if (!this.produto.nome) {
      erros.push('erros');
    }
    return true;
  }


  onCategoriaChange(categoria: Categoria) {
    this.produto.categoria = categoria.id;
  }

  getImageIfExists() {
    this.produtoService.getImageFromBucket(this.produto.id)
      .subscribe(response => {
          this.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.produto.id}.jpg`;
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
    });
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

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
    };

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.produtoService.uploadPicture(this.picture, this.produto.id)
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

  editarImagem() {
    if (this.editImage == false) {
      this.editImage = true;
    } else {
      this.editImage = false;
    }
  }
}
