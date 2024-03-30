import {Injectable} from '@angular/core';
import {Cliente} from '../class/cliente';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {API_CONFIG} from '../config/api.config';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {LocalUser} from '../class/local.user';
import {ImageUtilService} from "./image.util.service";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  constructor(public _http: HttpClient,
              public imageUtilService: ImageUtilService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
    })
  };

  findByEmail(email: string) {
    return this._http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  findByCpfOuCnpj(username: string): Observable<Cliente> {
    return this._http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/username?value=${username}`);
  }

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this._http.get(url, {responseType : 'blob'});
  }


  getByID(id: number) {
    return this._http.get(`${API_CONFIG.baseUrl}/clientes/` + id);
  }

  list(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes/listALL`)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes/create`, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData : FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this._http.post(
      `${API_CONFIG.baseUrl}/clientes/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/edit/${cliente.id}`, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  recuperarSenha(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${API_CONFIG.baseUrl}/auth/forgot`, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
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
