import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_CONFIG} from "../config/api.config";
import {CategoriaDTO} from "../class/dto/categoria.dto";
import {Produto} from '../class/produto';
import {Categoria} from '../class/categoria';

@Injectable()
export class CategoriaService {

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${API_CONFIG.baseUrl}/categorias/list`);
  }
}
