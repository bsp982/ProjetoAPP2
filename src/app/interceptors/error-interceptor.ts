import {HttpEvent, HttpInterceptor, HttpHandler, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {StorageService} from '../service/storage.service';
import {AlertController} from '@ionic/angular';
import {FieldMessage} from '../class/field.message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService, public alertCtrl: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('passou no interceptor');
    return next.handle(req).pipe(catchError((error, caught) => {

      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log('Erro detectado pelo interceptor:');
      console.log(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;

        case 422:
          this.handle422(errorObj);
          break;

        default:
          this.handleDefaultEror(errorObj);
      }

      return Observable.throw(errorObj);
    }) as any);
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  async handle401() {
    const alert = await this.alertCtrl.create({
      cssClass: 'erro-401',
      header: 'Falha na autenticação',
      message: 'Email ou senha incorretos',
      buttons: ['OK']
    });

    await alert.present();
  }

  async handle422(errorObj) {
    const alert = await this.alertCtrl.create({
      cssClass: 'erro-422',
      header: 'Erro de validação',
      message: this.listErrors(errorObj.errors),
      buttons: ['OK']
    });

    await alert.present();
  }

  async handleDefaultEror(errorObj) {
    const alert = await this.alertCtrl.create({
      cssClass: 'erro-422',
      header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  private listErrors(messages: FieldMessage[]): string {
    let s = '';

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};

