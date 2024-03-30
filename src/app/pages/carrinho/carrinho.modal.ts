import {Component, Injector, Input} from '@angular/core';
import {BaseComponent} from '../../class/commons-class/base.component';
import {AlertButtonSecondaryTypeEnum, AlertButtonTypeEnum, AlertTypeEnum} from '../../commons-module/utils/alert.util';
import {Produto} from '../../class/produto';

@Component({
  selector: 'carrinho-modal',
  templateUrl: 'carrinho.modal.html',
  styleUrls: ['./carrinho.modal.scss']
})
export class CarrinhoModal extends BaseComponent {

  @Input()
  listaProdutos: Produto[] = [];


  constructor(private injector: Injector) {
    super(injector);
  }

  init() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let returnedObject = this.router.getCurrentNavigation().extras.state;
      if (returnedObject) {
        this.listaProdutos = returnedObject.listaProdutos;
      }
    });
  }

  removerItem(produto: Produto) {
    // this.listaProdutosCarrinho.splice(this.listaProdutosCarrinho.indexOf(produto), 1);
  }

  backToHome() {
    this.navCtrl.navigateForward(`/home`);
  }

  getTotal() {
    return this.listaProdutos.reduce((i, j) => i + (j.preco) * j.quantidade, 0);
  }


  async clearCar() {
    const alert = await this.alertCtrl.create({
      message: 'Deseja realmente limpar o carrinho?',
      cssClass: AlertTypeEnum.INFO,
      buttons: [
        {
          text: 'Não',
          cssClass: AlertButtonSecondaryTypeEnum.PRIMARY,
        }, {
          text: 'Sim',
          cssClass: AlertButtonTypeEnum.INFO,
          handler: () => {
            this.listaProdutos = [];
          }
        }
      ]
    });

    await alert.present();
  }


  finaliza() {
    //TODO Criar o item Venda que vai conter um cliente e uma lista de produtos, data e total da venda
    this.navCtrl.navigateRoot('/finaliza');
  }

  addProduct(produto: Produto) {
    let adicionado = false;
    for (let produtoCarrinho of this.listaProdutos) {
      if (produtoCarrinho.id === produto.id) {
        produtoCarrinho.quantidade += 1;
        adicionado = true;
        break;
      }
    }
  }

  removeProduct(produto: Produto) {
    for (let produtoCarrinho of this.listaProdutos) {
      if (produtoCarrinho.id === produto.id) {
        produtoCarrinho.quantidade -= 1;
        if (produtoCarrinho.quantidade == 0) {
          this.listaProdutos.splice(this.listaProdutos.indexOf(produto), 1);
        }
      }
    }
  }
}
