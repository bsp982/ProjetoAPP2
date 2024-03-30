import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../../commons-module/components.commons.module';
import {ProdutoDetalhesPage} from './produto.detalhes.page';


const routes: Routes = [
  {
    path: '',
    component: ProdutoDetalhesPage
  }
];

@NgModule({
  declarations: [
    ProdutoDetalhesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProdutoDetalhesPage,
  ],
})

export class ProdutoDetalhesPageModule {
}
