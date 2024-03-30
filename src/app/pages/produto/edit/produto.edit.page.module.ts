import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../../commons-module/components.commons.module";
import {RouterModule, Routes} from "@angular/router";
import {ProdutoEditPage} from "./produto.edit.page";


const routes: Routes = [
  {
    path: '',
    component: ProdutoEditPage
  }
];

@NgModule({
  declarations: [
    ProdutoEditPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProdutoEditPage,
  ],
})

export class ProdutoEditPageModule {
}
