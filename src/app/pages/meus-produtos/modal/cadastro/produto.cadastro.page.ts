import {Component, Injector, Input, NgZone} from '@angular/core';
import {BaseComponent} from '../../../../class/commons-class/base.component';
import {ProdutoService} from '../../../../service/produto.service';
import {Produto} from '../../../../class/produto';
import {API_CONFIG} from '../../../../config/api.config';
import {DomSanitizer} from '@angular/platform-browser';
import {PositionToast, ToastUtil} from '../../../../class/commons-class/toast.util';
import {ToastType} from '../../../../class/commons-class/toast.type';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {CameraService} from '../../../../service/camera.service';
import {StringUtil} from '../../../../util/string.util';
import {AlertButtonTypeEnum, AlertTypeEnum} from '../../../../commons-module/utils/alert.util';

@Component({
  selector: 'produto-cadastro-page',
  templateUrl: 'produto.cadastro.page.html',
  styleUrls: ['./produto.cadastro.page.scss']
})
export class ProdutoCadastroModalPage extends BaseComponent {
  @Input()
  produto: Produto = new Produto();


  title: string;
  editOrNew: string;

  //Variaveis Camera
  profileImage: any = '';
  cameraOn: boolean = false;
  picture: string;
  editImage: boolean = false;


  constructor(private injector: Injector,
              private actionSheetCtrl: ActionSheetController,
              private cameraService: CameraService,
              private zone: NgZone,
              private produtoService: ProdutoService) {
    super(injector);
  }

  init() {
    if (this.produto.nome) {
      this.title = 'Edição Produto';
      this.editOrNew = 'Editar Produto';
    } else {
      this.title = 'Cadastro Produto';
      this.editOrNew = 'Adicionar Produto';
      this.produto.idCliente = this.currentUser.id;
    }
  }

  backToList() {
    this.modalCtrl.dismiss('close');
  }

  async removeProdut() {

    const alert = await this.alertCtrl.create({
      message: 'Deseja realmente remover o produto?',
      cssClass: AlertTypeEnum.INFO,
      buttons: [
        {
          text: 'Não',
          cssClass: AlertButtonTypeEnum.DANGER,
        }, {
          text: 'Sim',
          cssClass: AlertButtonTypeEnum.INFO,
          handler: () => {
            this.produtoService.delete(this.produto.id).subscribe(prod => {
              console.log("Deletou")
            });
          }
        }
      ]
    });

    await alert.present();

  }


  salvarProduto(produto: Produto) {
    if (this.validaCadastro()) {
      if (produto.id) {
        if (produto.imageUrl == null) {
          // produto.imageUrl = 'assets/imgs/imgNotFound.png';
        }

        this.produtoService.update(produto).subscribe(produtoEditado => {
          console.log('editou' + '-' + produtoEditado.nome);
          this.modalCtrl.dismiss(produto);
        });
      } else {
        this.produtoService.insert(produto).subscribe(produtoSalvo => {
          // this.produto.categoria = produtoSalvo.categoria;
          console.log('salvou' + '-' + produtoSalvo.nome);
          this.modalCtrl.dismiss(produto);
        });
      }

    } else {
      ToastUtil.presentToast(this.toastCtrl, 'Necessita dados', PositionToast.BOTTOM, ToastType.INFO, 500);
    }
  }


  validaCadastro() {
    //TODO VALIDAR

    return true;
  }

  //Camera ============================================================

  changeProductPicture(produto: Produto) {
    this.showActionSheetWithOptions(produto);
  }

  private async showActionSheetWithOptions(produto: Produto) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Alterar foto do produto',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Tirar foto',
          icon: 'camera',
          handler: () => {
            this.zone.run(() => {
              this.cameraService.getPictureFromCamera()
                .then(data => {
                  if (data) {
                    produto.imageUrl = this.toDataUrl(data);
                    // this.changeAvatar.emit(data);
                  }
                })
                .catch(error => console.error(error));
            });
          }
        },
        {
          text: 'Usar uma foto da galeria',
          icon: 'image',
          handler: () => {
            this.zone.run(() => {
              this.cameraService.getPictureFromPhotoLibrary()
                .then(data => {
                  produto.imageUrl = this.toDataUrl(data);

                  // this.changeAvatar.emit(data);
                })
                .catch(error => console.error(error));
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }

  private toDataUrl(data) {
    return `data:image/jpge;base64,${data}`;
  }

}
