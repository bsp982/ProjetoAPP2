import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../class/commons-class/base.component';
import {Cliente} from '../../class/cliente';
import {ClienteService} from '../../service/cliente.service';
import {PositionToast, ToastUtil} from '../../class/commons-class/toast.util';
import {ToastType} from '../../class/commons-class/toast.type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})

export class CadastroPage extends BaseComponent {
  usuario: Cliente = new Cliente();

  //icon olho tela login
  tipo: boolean;
  tipoConfirmaSenha: boolean;

  confirmaSenha: any;

  cnpjVisible: boolean = false;

  //variaveis de controle de erros visible or no-visible
  senhaIguaiserrovisible: boolean = false;
  cpfErroVisible: boolean = false;
  cnpjErroVisible: boolean = false;
  emailErroVisible: boolean = false;

  constructor(private injector: Injector,
              private clienteService: ClienteService) {
    super(injector);

  }

  ngOnInit() {
  }

  cadastrarCidade() {
    this.navCtrl.navigateRoot('/cadastro-endereco')
  }

  dismiss() {
    this.navCtrl.navigateRoot('/login')
  }

  exibiOcultarSenha() {
    this.tipo = !this.tipo;
  }

  exibirConfirmaSenha() {
    this.tipoConfirmaSenha = !this.tipoConfirmaSenha;
  }

  cadastrar() {
    if (this.validate(this.usuario)) {

      this.clienteService.save(this.usuario).subscribe(item => {
        if (item) {
          ToastUtil.presentToast(this.toastCtrl, "Usuário cadastrado", PositionToast.BOTTOM, ToastType.SUCCESS);
          this.navCtrl.navigateRoot('/login');
        } else {
          ToastUtil.presentToast(this.toastCtrl, "Email ja cadastrado", PositionToast.BOTTOM, ToastType.SUCCESS);
        }
      }, error => {
        ToastUtil.presentToast(this.toastCtrl, "Erro no servidor", PositionToast.BOTTOM, ToastType.ERROR);
      });
    } else {
      ToastUtil.presentToast(this.toastCtrl, "Necessário preencher todos os dados", PositionToast.BOTTOM, ToastType.ERROR);
    }
  }

  validate(usuario: Cliente) {
    let valido: boolean = true

    if (usuario.cpfOuCnpj == null || usuario.nome == null || usuario.senha == null || usuario.email == null) {
      valido = false
    }

    return valido;
  }

  focusout(event: FocusEvent) {
    if (!(this.usuario.senha == this.confirmaSenha)) {
      this.senhaIguaiserrovisible = true
    }
  }

  /**
   *Esse metodo é chamado quando o focus é tirado do input do email
   */
  focusoutEmail(event: FocusEvent) {
    this.validaEmail(this.usuario.email)
  }

  validaEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      this.emailErroVisible = true;
    }else {
      this.emailErroVisible = false;
    }
  }

  /**
   *Esse metodo é chamado quando o focus é tirado do input do cpf
   */
  validaCpf($event: any) {
    //Deve ser validado se o cpf é valido caso seja valido retorna false se nao retorna true
    this.cpfErroVisible = false;
  }

  /**
   *Esse metodo é chamado quando o focus é tirado do input do cnpj
   */
  validaCnpj($event: any) {
    //Deve ser validado se o cnpj é valido caso seja valido retorna false se nao retorna true
    this.cnpjErroVisible = false;
  }

  /**
   *Esse metodo é chamado quando o radio groud é setado diferentemente para cpf ou cnpj
   */
  onRadioGroupChange(event: any) {
    this.cnpjVisible = event.detail.value != 'cpf';
  }


}
