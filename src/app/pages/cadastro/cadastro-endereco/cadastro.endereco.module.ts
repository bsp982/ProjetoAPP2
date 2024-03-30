import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CadastroEnderecoPage} from './cadastro.endereco.page';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RouterModule, Routes} from "@angular/router";
import {ComponentsModule} from '../../../commons-module/components.commons.module';

const routes: Routes = [
  {
    path: '',
    component: CadastroEnderecoPage
  }
];

@NgModule({
  declarations: [
    CadastroEnderecoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CadastroEnderecoPage,
  ],
})

export class CadastroEnderecoPageModule {
}
