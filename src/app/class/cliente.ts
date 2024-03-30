import {Endereco} from './endereco';

export class Cliente {
  id: string;

  cpfOuCnpj: string;

  username: string;

  nome: string;

  email: string;

  senha: string;

  imageUrl?: string;

  perfil: string;

  telefone: string;

  aceitaTermosUso: boolean;

  aceitaPolitica: boolean;

  enderecos: Endereco[];



  active: boolean;
}
