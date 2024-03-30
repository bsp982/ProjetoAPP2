import {TipoClienteEnum} from "../enums/tipo.cliente.enum";
import {Endereco} from "../endereco";

export class ClienteDTO {

  id: string;

  nome: string;

  email: string;

  cpfOuCnpj: string;

  tipo: TipoClienteEnum;

  username: string;

  senha: string;

  enderecos: Endereco[];

  imageUrl?: string;
}
