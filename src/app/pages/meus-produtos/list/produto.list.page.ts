import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../../class/commons-class/base.component';
import {ProdutoService} from '../../../service/produto.service';
import {Produto} from '../../../class/produto';
import {Cliente} from '../../../class/cliente';
import {ProdutoCadastroModalPage} from '../modal/cadastro/produto.cadastro.page';

@Component({
  selector: 'produto-list-page',
  templateUrl: 'produto.list.page.html',
  styleUrls: ['./produto.list.page.scss']
})
export class ProdutoListPage extends BaseComponent {
  cliente: Cliente;

  listaProdutos: Produto[] = [];

  constructor(private injector: Injector,
              private produtoService: ProdutoService) {
    super(injector);

    this.cliente = this.currentUser;
  }

  init() {
    this.carregaProdutos();
  }


  new() {
    this.navCtrl.navigateForward(`/produto/edit/`);
  }

  carregaProdutos() {
    this.listaProdutos = [];
    this.produtoService.findAll().subscribe((produtosDB) => {
      this.listaProdutos = produtosDB.filter(item => item.idCliente == this.cliente.id);
    });
  }

  backHome() {
    this.navCtrl.navigateForward(`/home`);
  }

  async editProduto(produto: Produto) {
    let produtoModal = await this.modalCtrl.create({
      component: ProdutoCadastroModalPage,
      componentProps: {
        produto: produto
      }
    });

    produtoModal.onDidDismiss().then(produtoEdit => {
      if (produtoEdit != null && produtoEdit.data != 'close') {
        this.listaProdutos.splice(this.listaProdutos.indexOf(produto), 1);
        this.listaProdutos.push(produtoEdit.data);
      } else {
        this.init();
      }
    });

    await produtoModal.present();
  }

  async newProdut() {
    let produtoModal = await this.modalCtrl.create({
      component: ProdutoCadastroModalPage,
      componentProps: {
        produto: new Produto()
      }
    });

    produtoModal.onDidDismiss().then(data => {
      if (data != null && data.data != 'close') {
        this.listaProdutos.push(data.data);
      } else {
        this.init();
      }
    });

    await produtoModal.present();
  }
}
