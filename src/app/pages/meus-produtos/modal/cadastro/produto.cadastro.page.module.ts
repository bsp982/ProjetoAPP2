import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../../../commons-module/components.commons.module';
import {ProdutoCadastroModalPage} from './produto.cadastro.page';
import {BrMaskerModule} from 'br-mask';


@NgModule({
  entryComponents: [ProdutoCadastroModalPage],
  declarations: [
    ProdutoCadastroModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicModule.forRoot(),
    BrMaskerModule,
  ],
  exports: [
    ProdutoCadastroModalPage,
  ],
})

export class ProdutoCadastroModalModule {
}
