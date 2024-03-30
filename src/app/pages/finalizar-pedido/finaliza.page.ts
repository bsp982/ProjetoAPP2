import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../class/commons-class/base.component';
import {ClienteService} from '../../service/cliente.service';
import {AuthService} from '../../service/auth.service';
import {ProdutoService} from '../../service/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './finaliza.page.html',
  styleUrls: ['./finaliza.page.scss'],
})
export class FinalizaPage extends BaseComponent {

  constructor(private injector: Injector,
              public clienteService: ClienteService,
              public authService: AuthService,
              private produtoService: ProdutoService) {
    super(injector);
  }

}
