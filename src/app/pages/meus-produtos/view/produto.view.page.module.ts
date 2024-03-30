import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../../commons-module/components.commons.module';
import {ProdutoViewPage} from './produto.view.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoViewPage
  }
];

@NgModule({
  declarations: [
    ProdutoViewPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProdutoViewPage,
  ],
})

export class ProdutoViewPageModule {
}
