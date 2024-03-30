import {Component, Injector} from '@angular/core';
import {NavController} from "@ionic/angular";
import {PositionToast, ToastUtil} from "../../class/commons-class/toast.util";
import {BaseComponent} from "../../class/commons-class/base.component";
import {ClienteService} from "../../service/cliente.service";
import {AuthService} from "../../service/auth.service";
import {ToastType} from "../../class/commons-class/toast.type";
import {Cliente} from "../../class/cliente";

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery.password.page.html',
  styleUrls: ['./recovery.password.page.scss'],
})
export class RecoveryPasswordPage extends BaseComponent {

  tipo: boolean;
  usuario: Cliente = new Cliente()
  cpfOuCnpj: string;
  isloading: boolean = false;

  constructor(private injector: Injector,
              public navCtrl: NavController,
              private clienteService: ClienteService,
              private authService: AuthService) {
    super(injector)
  }

  ngOnInit() {
  }

  dismiss() {
    this.navCtrl.navigateRoot('/login');
  }


  enviarEmail() {
    this.isloading = true;
    this.clienteService.recuperarSenha(this.usuario).subscribe(item => {
      if (this.usuario) {
        ToastUtil.presentToast(this.toastCtrl, "Email enviado!", PositionToast.BOTTOM, ToastType.SUCCESS);
        this.navCtrl.navigateRoot('/login');
        this.isloading = false;
      } else {
        this.isloading = false;
        ToastUtil.presentToast(this.toastCtrl, "Usuário não encontrado!", PositionToast.BOTTOM, ToastType.ERROR);
      }
    }, error => {
      this.isloading = false;
      ToastUtil.presentToast(this.toastCtrl, "Erro no servidor", PositionToast.BOTTOM, ToastType.ERROR);
    });
  }
}
