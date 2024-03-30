import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'cadastro-endereco',
    loadChildren: () => import('./pages/cadastro/cadastro-endereco/cadastro.endereco.module').then(m => m.CadastroEnderecoPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'meus-produtos',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/meus-produtos/list/produto.list.page.module').then(m => m.ProdutoListPageModule)
      },
      {
        path: 'view',
        loadChildren: () => import('./pages/meus-produtos/view/produto.view.page.module').then(m => m.ProdutoViewPageModule)
      },
      {
        path: 'detalhes',
        loadChildren: () => import('./pages/meus-produtos/detalhes/produto.detalhes.page.module').then(m => m.ProdutoDetalhesPageModule)
      }
    ]
  },

  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./pages/carrinho/carrinho.module').then(m => m.CarrinhoModule)
  },
  {
    path: 'produto',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/meus-produtos/list/produto.list.page.module').then(m => m.ProdutoListPageModule)
      }
    ]
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./pages/recovery-password/recovery.password.module').then(m => m.RecoveryPasswordPageModule)
  },
  {
    path: 'finaliza',
    loadChildren: () => import('./pages/finalizar-pedido/finaliza.module').then(m => m.FinalizaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
