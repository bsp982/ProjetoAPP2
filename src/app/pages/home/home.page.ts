import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../class/commons-class/base.component';
import {ClienteService} from '../../service/cliente.service';
import {ProdutoDTO} from '../../class/dto/produto.dto';
import {CategoriaDTO} from '../../class/dto/categoria.dto';
import {NavigationExtras} from '@angular/router';
import {Cliente} from '../../class/cliente';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseComponent {
  listaCategorias: CategoriaDTO[] = [];
  clientes: Cliente[] = [];
  listaProdutos: ProdutoDTO[] = [];
  listaProdutosCarrinho: ProdutoDTO[] = [];

  constructor(private injector: Injector, private cliente: ClienteService) {
    super(injector);
  }

  ngOnInit() {

    this.criarClientes();

  }

  private criarClientes() {
    let cliente1 = new Cliente();
    cliente1.nome = 'Joao da cenoura';
    cliente1.id = '2';
    cliente1.imageUrl = '/assets/users/cliente1.png';

    let cliente2 = new Cliente();
    cliente2.nome = 'Joana da couve';
    cliente2.imageUrl = '/assets/users/cliente2.png';

    let cliente3 = new Cliente();
    cliente3.nome = 'Joao da rabanete';
    cliente3.imageUrl = '/assets/users/cliente3.png';

    let cliente4 = new Cliente();
    cliente4.nome = 'Joao da milho';
    cliente4.imageUrl = '/assets/users/cliente4.png';


    this.clientes.push(cliente1, cliente2, cliente3, cliente4);
  }

  goToProdutos(cliente: Cliente) {
    const navigationExtra: NavigationExtras = {state: {cliente: cliente}};
    this.navCtrl.navigateRoot('/meus-produtos/view', navigationExtra);
  }

}
