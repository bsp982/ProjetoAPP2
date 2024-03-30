import {Component, Injector} from '@angular/core';
import {BaseComponent} from '../../../class/commons-class/base.component';
import {Cliente} from '../../../class/cliente';
import {ClienteService} from '../../../service/cliente.service';
import {PositionToast, ToastUtil} from '../../../class/commons-class/toast.util';
import {ToastType} from '../../../class/commons-class/toast.type';
import {AuthService} from '../../../service/auth.service';
import {Cep} from '../../../class/cep';
import {error} from '@angular/compiler/src/util';


@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro.endereco.page.html',
  styleUrls: ['./cadastro.endereco.page.scss'],
})

export class CadastroEnderecoPage extends BaseComponent {
  usuario: Cliente = new Cliente();
  cep: boolean = true;
  enderecoCompleto: Cep =  new Cep();
  termosDeUso: boolean = false;
  termosDePrivacidade: boolean = false;
  cepErrorVisible: boolean = false;


  constructor(private injector: Injector,
              private clienteService: ClienteService,
              private authService: AuthService) {
    super(injector);
  }

  ngOnInit() {

  }


  dismiss() {
    this.navCtrl.navigateRoot('/cadastro')
  }


  cadastrar() {
    if (this.validate(this.enderecoCompleto)) {
  this.termosDeUso = true;
  this.termosDePrivacidade = true;
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

  validate(endereco:Cep) {
    let valido: boolean = true

    if (endereco.code == null || endereco.district == null  || endereco.city ==null || endereco.address == null || endereco.number == null || this.termosDeUso == false || this.termosDePrivacidade == false) {
      valido = false
    }

    return valido;
  }

  focusout(event: FocusEvent) {
    if (this.enderecoCompleto.code != null ) {
      this.buscaCep(this.enderecoCompleto.code);
    }else {
      ToastUtil.presentToast(this.toastCtrl, "Cep invalido", PositionToast.BOTTOM, ToastType.ERROR);

    }
  }

  buscaCep(cep:string){
    this.authService.buscaCep(cep).subscribe(end =>{
      this.enderecoCompleto = end;
      console.log(this.enderecoCompleto.message);
    });
  }

  termoDePrivacidadeOnChange($event: MouseEvent){
    if(this.termosDePrivacidade == false) {
      this.termosDePrivacidade = true;
      console.log(this.termosDePrivacidade);
    }else if(this.termosDePrivacidade == true){
      this.termosDePrivacidade = false;
      console.log(this.termosDePrivacidade);
    }

}

  termoDeUsoOnChange($event: MouseEvent) {
    if(this.termosDeUso == false) {
      this.termosDeUso = true;
      console.log(this.termosDeUso);
    }else if(this.termosDeUso == true){
      this.termosDeUso = false;
      console.log(this.termosDeUso);
    }
  }

}
