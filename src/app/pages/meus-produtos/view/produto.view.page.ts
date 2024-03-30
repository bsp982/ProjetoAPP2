import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../../class/commons-class/base.component';
import {ProdutoService} from '../../../service/produto.service';
import {NavigationExtras} from '@angular/router';
import {Produto} from '../../../class/produto';
import {Cliente} from '../../../class/cliente';
import {PositionToast, ToastUtil} from '../../../class/commons-class/toast.util';
import {ToastType} from '../../../class/commons-class/toast.type';

@Component({
  selector: 'produto-view-page',
  templateUrl: 'produto.view.page.html',
  styleUrls: ['./produto.view.page.scss']
})
export class ProdutoViewPage extends BaseComponent {
  cliente: Cliente;

  listaProdutos: Produto[] = [];

  listaProdutosCarrinho: Produto[] = [];

  constructor(private injector: Injector,
              private produtoService: ProdutoService) {
    super(injector);
    this.pegarCliente();
  }

  init() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.carregaProdutos();
  }

  private pegarCliente() {
    this.activatedRoute.queryParams.subscribe(params => {
      let returnedObject = this.router.getCurrentNavigation().extras.state;
      if (returnedObject) {
        this.cliente = returnedObject.cliente;
      }
    });
  }

  carregaProdutos() {
    this.listaProdutos = [];
    this.produtoService.findAll().subscribe((produtosDB) => {
      this.listaProdutos = produtosDB.filter(item => item.idCliente == this.cliente.id);
    });
  }

  backHome() {
    this.listaProdutosCarrinho = [];
    this.navCtrl.navigateForward(`/home`);
  }

  editProduto(produto: Produto) {
    const navigationExtra: NavigationExtras = {
      state: {produto: produto}
    };
    this.navCtrl.navigateForward(`/meus-produtos/cadastro`, navigationExtra);
  }

  newProdut() {
    this.navCtrl.navigateForward(`/meus-produtos/cadastro`);
  }

  openCar() {
    const navigationExtra: NavigationExtras = {
      state: {listaProdutos: this.listaProdutosCarrinho}
    };
    this.navCtrl.navigateForward(`/carrinho`, navigationExtra);
  }

  addProdut(produto: Produto) {
    let adicionado = false;
    for (let produtoCarrinho of this.listaProdutosCarrinho) {
      if (produtoCarrinho.id === produto.id) {
        produtoCarrinho.quantidade += 1;
        adicionado = true;
        break;
      }
    }
    if (!adicionado) {
      this.listaProdutosCarrinho.push(produto);
    }
    ToastUtil.presentToast(this.toastCtrl, 'Produto adicionado', PositionToast.BOTTOM, ToastType.SUCCESS);
  }

  openDetalhes(produto: Produto) {
    const navigationExtra: NavigationExtras = {
      state: {produto: produto}
    };
    this.navCtrl.navigateForward(`/meus-produtos/detalhes`, navigationExtra);
  }
}
