import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CadastroPage} from './cadastro.page';
import {ComponentsModule} from "../../commons-module/components.commons.module";
import {PerfilPage} from "../perfil/perfil.page";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: CadastroPage
  }
];

@NgModule({
  declarations: [
    CadastroPage
  ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        RouterModule.forChild(routes),
    ],
  exports: [
    CadastroPage,
  ],
})

export class CadastroPageModule {
}
