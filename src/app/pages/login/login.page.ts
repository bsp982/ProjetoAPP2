import {BaseComponent} from '../../class/commons-class/base.component';
import {Component, Injector, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {API_CONFIG} from '../../config/api.config';
import {CredenciaisDTO} from '../../class/dto/credenciais.dto';
import {StorageService} from '../../service/storage.service';
import {Cliente} from '../../class/cliente';
import {Subscription} from 'rxjs';
import {ClienteService} from '../../service/cliente.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginPage extends BaseComponent {
    tipo: boolean;
    usuario: Cliente = new Cliente();

    isloading: boolean = false;

    constructor(private injector: Injector,
                public auth: AuthService,
                private storageService: StorageService,
                private clienteService: ClienteService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.usuario.username = '14285871602';
        this.usuario.senha = '123'


        this.auth.refreshToken()
            .subscribe(response => {
                    this.auth.successfulLogin(response.headers.get('Authorization'));
                    this.navCtrl.navigateRoot('/home');
                },
                error => {
                });
    }

    exibiOcultarSenha() {
        this.tipo = !this.tipo;
    }

    cadastrarSe() {
        this.navCtrl.navigateRoot('/cadastro');
    }

    acessar() {
// let token;
//         this.auth.authenticate(this.usuario)
//             .subscribe((response) => {
        // token = response.headers.get('Authorization');
        // console.log(token);

        this.clienteService.list().subscribe((clientes) => {
            if (clientes) {
                clientes.forEach(cliente => {
                    if (cliente.cpfOuCnpj == this.usuario.username && '123' == this.usuario.senha) {
                        console.log(cliente);
                        this.appService.setCurrentUser(cliente);
                    }
                });
            }

        });

        this.navCtrl.navigateRoot('/home');
        // },
        // error => {
        // });
    }

    recoveryPassword() {
        this.navCtrl.navigateRoot('/recovery-password');
    }

}
