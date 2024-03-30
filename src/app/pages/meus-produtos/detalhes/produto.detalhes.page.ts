import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../../class/commons-class/base.component';
import {Produto} from '../../../class/produto';

@Component({
  selector: 'produto-detalhes-page',
  templateUrl: 'produto.detalhes.page.html',
  styleUrls: ['./produto.detalhes.page.scss']
})
export class ProdutoDetalhesPage extends BaseComponent {

  produto: Produto;

  constructor(private injector: Injector) {
    super(injector);
    this.pegarProduto();
  }

  init() {

  }

  backHome() {
    this.navCtrl.navigateForward(`/home`);
  }

  private pegarProduto() {
    this.activatedRoute.queryParams.subscribe(params => {
      let returnedObject = this.router.getCurrentNavigation().extras.state;
      if (returnedObject) {
        this.produto = returnedObject.produto;
      }
    });
  }
}
