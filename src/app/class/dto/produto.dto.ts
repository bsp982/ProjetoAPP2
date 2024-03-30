class Categoria {
}

export class ProdutoDTO {

  id: string;

  nome: string;

  preco: number;

  imageUrl?: string;

  quantidade: number;

  promocao: boolean;

  desconto: number;

  categoria: Categoria;

  idCliente: string;

}
