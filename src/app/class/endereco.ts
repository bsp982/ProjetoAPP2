import {Cliente} from "./cliente";
import {Cidade} from "./cidade";
import {Estado} from './estado';

export class Endereco {

  id: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  estado: Estado;
  cliente: Cliente;

  cidade: Cidade;

}
