import {Injectable} from '@angular/core';
import {Cliente} from '../class/cliente';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {API_CONFIG} from '../config/api.config';
import {StorageService} from './storage.service';
import {CredenciaisDTO} from '../class/dto/credenciais.dto';
import {LocalUser} from "../class/local.user";
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Cep} from '../class/cep';

@Injectable()
export class AuthService {


  constructor(public http: HttpClient,
              public storage: StorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      observe:'response'
    })
  };

  authenticate(usuario: CredenciaisDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, usuario,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: ""
      // email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
    // this.cartService.createOrClearCart();
  }


  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  // logar(cliente: Cliente): Observable<Cliente> {
  //   return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/cliente/login`, cliente, )
  //   // .pipe(
  //   //   retry(2),
  //   //   catchError(this.handleError)
  //   // );
  // }

  succefullLogin(authorizationValue: string) {

    const tok = authorizationValue.substring(7);
    const user: LocalUser = {
      token: tok,
      email: ""
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    // this.storage.setLocalUser(null);
  }

  buscaCep(cep: string): Observable <Cep>{
    return this.http.get<Cep>(`${API_CONFIG.buscaCep}/` + cep + '.json');

  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do cliente
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
